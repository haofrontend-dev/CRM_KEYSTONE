'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { PostCard, type SerializedPost } from './PostCard'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Props = {
  posts: SerializedPost[]
  autoplay?: boolean
  autoplaySpeed?: number
  loop?: boolean
  slidesPerView?: number
}

export function PostsSlider({
  posts,
  autoplay = false,
  autoplaySpeed = 4000,
  loop = true,
  slidesPerView = 3,
}: Props) {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <div className="relative mt-12 group/slider posts-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={(s) => { swiperRef.current = s }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: Math.min(2, slidesPerView) },
          1024: { slidesPerView },
        }}
        loop={loop && posts.length > slidesPerView}
        autoplay={
          autoplay
            ? { delay: autoplaySpeed, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        pagination={{ clickable: true, el: '.posts-slider-dots' }}
        grabCursor
        className="!overflow-hidden"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id} className="!h-auto">
            <div className="h-full pb-2">
              <PostCard post={post} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom arrows */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous"
        className="absolute -left-5 top-[40%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-(--shadow-premium) inline-flex items-center justify-center text-navy-900 hover:bg-gold-500 hover:text-navy-900 transition-all hover:scale-110 opacity-0 group-hover/slider:opacity-100"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next"
        className="absolute -right-5 top-[40%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-(--shadow-premium) inline-flex items-center justify-center text-navy-900 hover:bg-gold-500 hover:text-navy-900 transition-all hover:scale-110 opacity-0 group-hover/slider:opacity-100"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot pagination */}
      <div className="posts-slider-dots mt-8 flex items-center justify-center gap-2" />

      {/* Custom Swiper styles */}
      <style jsx global>{`
        .posts-slider .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: var(--color-navy-900, #0a1f3c);
          opacity: 0.2;
          transition: all 0.3s;
          border-radius: 9999px;
        }
        .posts-slider .swiper-pagination-bullet-active {
          background: var(--color-gold-500, #d4a853);
          opacity: 1;
          transform: scale(1.25);
        }
      `}</style>
    </div>
  )
}
