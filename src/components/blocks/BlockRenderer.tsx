import { HeroBlock, type HeroBlockData } from './HeroBlock'
import { HeroSliderBlock, type HeroSliderBlockData } from './HeroSliderBlock'
import { IntroBlock, type IntroBlockData } from './IntroBlock'
import { StatsBlock, type StatsBlockData } from './StatsBlock'
import { TeamBlock, type TeamBlockData } from './TeamBlock'
import { TestimonialsBlock, type TestimonialsBlockData } from './TestimonialsBlock'
import { ServicesBlock, type ServicesBlockData } from './ServicesBlock'
import { FeaturesBlock, type FeaturesBlockData } from './FeaturesBlock'
import { FeatureCardsBlock, type FeatureCardsBlockData } from './FeatureCardsBlock'
import { FeatureListBlock, type FeatureListBlockData } from './FeatureListBlock'
import { CtaBlock, type CtaBlockData } from './CtaBlock'
import { ImageBlock, type ImageBlockData } from './ImageBlock'
import { PartnersBlock, type PartnersBlockData } from './PartnersBlock'
import { PostsBlock, type PostsBlockData } from './PostsBlock'
import { SplitBlock, type SplitBlockData } from './SplitBlock'
import { CategoryListBlock, type CategoryListBlockData } from './CategoryListBlock'
import { EventsBlock, type EventsBlockData } from './EventsBlock'
import { MapBlock, type MapBlockData } from './MapBlock'
import { ContactFormBlock, type ContactFormBlockData } from './ContactFormBlock'
import { LegalDocBlock, type LegalDocBlockData } from './LegalDocBlock'
import { RawHtmlBlock, type RawHtmlBlockData } from './RawHtmlBlock'

type AnyBlock = { blockType: string; id?: string } & Record<string, unknown>

export function BlockRenderer({
  blocks,
  currentPage,
  pageBasePath,
  catFilter,
}: {
  blocks: AnyBlock[]
  currentPage?: number
  pageBasePath?: string
  catFilter?: string | null
}) {
  return (
    <>
      {blocks.map((b, i) => {
        const key = b.id ?? `${b.blockType}-${i}`
        switch (b.blockType) {
          case 'hero':
            return <HeroBlock key={key} {...(b as unknown as HeroBlockData)} />
          case 'heroSlider':
            return <HeroSliderBlock key={key} {...(b as unknown as HeroSliderBlockData)} />
          case 'intro':
            return <IntroBlock key={key} {...(b as unknown as IntroBlockData)} />
          case 'stats':
            return <StatsBlock key={key} {...(b as unknown as StatsBlockData)} />
          case 'team':
            return <TeamBlock key={key} {...(b as unknown as TeamBlockData)} />
          case 'testimonials':
            return <TestimonialsBlock key={key} {...(b as unknown as TestimonialsBlockData)} />
          case 'services':
            return <ServicesBlock key={key} {...(b as unknown as ServicesBlockData)} />
          case 'features':
            return <FeaturesBlock key={key} {...(b as unknown as FeaturesBlockData)} />
          case 'featureCards':
            return <FeatureCardsBlock key={key} {...(b as unknown as FeatureCardsBlockData)} />
          case 'featureList':
            return <FeatureListBlock key={key} {...(b as unknown as FeatureListBlockData)} />
          case 'cta':
            return <CtaBlock key={key} {...(b as unknown as CtaBlockData)} />
          case 'image':
            return <ImageBlock key={key} {...(b as unknown as ImageBlockData)} />
          case 'partners':
            return <PartnersBlock key={key} {...(b as unknown as PartnersBlockData)} />
          case 'posts':
            return (
              <PostsBlock
                key={key}
                {...(b as unknown as PostsBlockData)}
                currentPage={currentPage}
                pageBasePath={pageBasePath}
              />
            )
          case 'split':
            return <SplitBlock key={key} {...(b as unknown as SplitBlockData)} />
          case 'categoryList':
            return <CategoryListBlock key={key} {...(b as unknown as CategoryListBlockData)} />
          case 'events':
            return (
              <EventsBlock
                key={key}
                {...(b as unknown as EventsBlockData)}
                currentPage={currentPage}
                pageBasePath={pageBasePath}
                catFilter={catFilter}
              />
            )
          case 'map':
            return <MapBlock key={key} {...(b as unknown as MapBlockData)} />
          case 'contactForm':
            return <ContactFormBlock key={key} {...(b as unknown as ContactFormBlockData)} />
          case 'legalDoc':
            return <LegalDocBlock key={key} {...(b as unknown as LegalDocBlockData)} />
          case 'rawHtml':
            return <RawHtmlBlock key={key} {...(b as unknown as RawHtmlBlockData)} />
          default:
            return null
        }
      })}
    </>
  )
}
