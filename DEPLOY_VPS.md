# Triển khai CMS Keystone sang VPS mới

Tài liệu này dựng một VPS mới giống production hiện tại: Payload CMS + Next.js chạy bằng Docker Compose, PostgreSQL và 3 app replicas phía sau Nginx. Tài liệu chỉ hướng dẫn thao tác; không chạy hay thay đổi VPS hiện tại.

## 1. Dữ liệu phải chuyển

Clone source là chưa đủ. Payload lưu dữ liệu ở database và file upload.

| Thành phần | Cách chuyển | Nếu thiếu |
| --- | --- | --- |
| PostgreSQL | Dump/restore database | Mất Pages, Site Settings, Footer, tài khoản admin, nội dung CMS |
| `media/` | Copy nguyên thư mục | Mất logo, favicon và ảnh Payload upload |
| Source Git | Clone branch `master` | Thiếu code/Docker Compose |
| `.env`, `.env.db` | Tạo lại trên VPS mới, không commit | App không kết nối được DB |

## 2. Điều kiện VPS mới

- Docker Engine và Docker Compose v2 (`docker compose version`).
- DNS domain trỏ về VPS mới; mở cổng 80/443 cho Nginx.
- Docker network external tên `edge`. Compose không public cổng app: Nginx phải cùng network này để proxy đến 3 replicas.
- Docker BuildKit khả dụng; Dockerfile dùng BuildKit secrets trong lúc build.

Tạo network một lần:

```bash
docker network create edge
```

## 3. Backup ở VPS cũ

Thay `/opt/cms-keystone` bằng thư mục source thực tế.

```bash
cd /opt/cms-keystone
mkdir -p backup

# Đọc database/user từ container, không in mật khẩu ra terminal.
docker exec cms-keystone-db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' \
  > backup/cms-keystone.dump

tar -C . -czf backup/media.tar.gz media
```

Chuyển `cms-keystone.dump` và `media.tar.gz` sang VPS mới bằng `scp`/ `rsync` qua SSH. Không đưa dump, `media/`, `.env` hoặc `.env.db` vào Git.

## 4. Chuẩn bị source và environment trên VPS mới

```bash
sudo mkdir -p /opt/cms-keystone
sudo chown "$USER":"$USER" /opt/cms-keystone
git clone git@github.com:haofrontend-dev/CRM_KEYSTONE.git /opt/cms-keystone
cd /opt/cms-keystone
git checkout master
umask 077
```

Tạo file `.env`:

```dotenv
NEXT_PUBLIC_SITE_URL=https://keystone.com.vn
PAYLOAD_SECRET=chuoi-ngau-nhien-toi-thieu-32-ky-tu

# Dùng khi docker build: build network=host nên dùng port localhost 5435.
DATABASE_URI=postgres://keystone_app:MAT_KHAU_DB@127.0.0.1:5435/cms_keystone?sslmode=disable

# Dùng khi container chạy: hostname là Docker service postgres.
DATABASE_URI_INTERNAL=postgres://keystone_app:MAT_KHAU_DB@postgres:5432/cms_keystone?sslmode=disable

RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_ADMIN_EMAIL=admin@example.com
```

Tạo file `.env.db`:

```dotenv
POSTGRES_DB=cms_keystone
POSTGRES_USER=keystone_app
POSTGRES_PASSWORD=MAT_KHAU_DB
```

```bash
chmod 600 .env .env.db
```

Lưu ý:

- Giữ nguyên `PAYLOAD_SECRET` của VPS cũ để session/token Payload không bị mất hiệu lực.
- `NEXT_PUBLIC_SITE_URL` phải là domain HTTPS thật. Giá trị này được đóng vào bundle lúc build, đổi domain phải build lại.
- Hai database URI dùng cùng user/password/database, chỉ khác hostname/port.

## 5. Restore database và media

Chép backup vào `/opt/cms-keystone/backup/`, sau đó chạy PostgreSQL trước:

```bash
cd /opt/cms-keystone
docker compose up -d postgres
docker compose exec postgres pg_isready -U keystone_app -d cms_keystone

docker compose exec -T postgres sh -c 'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists' \
  < backup/cms-keystone.dump

tar -xzf backup/media.tar.gz
chmod -R u+rwX media
```

Với VPS hoàn toàn mới không cần dữ liệu cũ, bỏ qua restore. Không chạy seed trên database đã restore vì có thể ghi đè dữ liệu CMS.

## 6. Nginx reverse proxy

Nginx phải thấy `cms-app-1`, `cms-app-2`, `cms-app-3` qua network `edge`. Ví dụ cấu hình:

```nginx
upstream cms_keystone {
  least_conn;
  server cms-app-1:3000;
  server cms-app-2:3000;
  server cms-app-3:3000;
}

server {
  listen 80;
  server_name keystone.com.vn www.keystone.com.vn;

  # Khi có certificate: return 301 https://$host$request_uri;
  location / {
    proxy_pass http://cms_keystone;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Nếu Nginx là container riêng:

```bash
docker network connect edge <ten-container-nginx>
```

## 7. Build và chạy

Chỉ thực hiện khi database, media, network và Nginx đã sẵn sàng:

```bash
cd /opt/cms-keystone
DOCKER_BUILDKIT=1 docker compose up -d --build
docker compose ps
docker compose logs -f --tail=100 app1
```

Kiểm tra sau deploy:

```bash
curl -I https://keystone.com.vn/
curl -I https://keystone.com.vn/admin
curl -I https://keystone.com.vn/api/media/file/<ten-file-anh>
```

Mở `/admin`, kiểm tra Site Settings (logo/footer/favicon), một Page và một ảnh media.

## 8. Cập nhật code sau này

```bash
cd /opt/cms-keystone
git pull --ff-only origin master
DOCKER_BUILDKIT=1 docker compose up -d --build
docker image prune -f
```

Không chạy `docker compose down -v` trên production: `-v` sẽ xóa PostgreSQL volume `pgdata`.

## 9. Lệnh vận hành hữu ích

```bash
docker compose ps
docker compose logs -f --tail=100 app1 app2 app3

docker exec cms-keystone-db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' \
  > cms-keystone-$(date +%F).dump

# Chỉ restart app, không đụng DB/media.
docker compose restart app1 app2 app3
```

