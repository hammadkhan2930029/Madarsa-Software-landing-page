import ContactPage from './ContactPage'
import DemoSectionPage from './DemoSectionPage'
import FeaturesPage from './FeaturesPage'
import FooterPage from './FooterPage'
import HeroPage from './HeroPage'
import MediaPage from './MediaPage'
import NavigationPage from './NavigationPage'
import NotFoundPage from './NotFoundPage'
import SettingsPage from './SettingsPage'
import SliderPage from './SliderPage'
import StatsPage from './StatsPage'

export function getAdminPage(path, openEditor, data = {}, actions = {}) {
  if (path === '/admin' || path === '/admin/hero') return <HeroPage openEditor={openEditor} hero={data.hero} />
  if (path === '/admin/navigation') return <NavigationPage openEditor={openEditor} navLinks={data.navLinks} onDelete={(row) => actions.deleteRecord?.('nav-links', row)} onRestore={(row) => actions.restoreRecord?.('nav-links', row)} />
  if (path === '/admin/stats') return <StatsPage openEditor={openEditor} stats={data.stats} onDelete={(row) => actions.deleteRecord?.('stats', row)} onRestore={(row) => actions.restoreRecord?.('stats', row)} />
  if (path === '/admin/slider') return <SliderPage openEditor={openEditor} sliderSection={data.sliderSection} sliderModules={data.sliderModules} onDelete={(row) => actions.deleteRecord?.('slider-modules', row)} onRestore={(row) => actions.restoreRecord?.('slider-modules', row)} />
  if (path === '/admin/features') return <FeaturesPage openEditor={openEditor} features={data.features} featureSection={data.featureSection} onDelete={(row) => actions.deleteRecord?.('features', row)} onRestore={(row) => actions.restoreRecord?.('features', row)} />
  if (path === '/admin/demo-section') return <DemoSectionPage openEditor={openEditor} demoSection={data.demoSection} demoBenefits={data.demoBenefits} onDelete={(row) => actions.deleteRecord?.('demo-benefits', row)} onRestore={(row) => actions.restoreRecord?.('demo-benefits', row)} />
  if (path === '/admin/footer') return <FooterPage openEditor={openEditor} footer={data.footer} />
  if (path === '/admin/contact') return <ContactPage openEditor={openEditor} contactItems={data.contactItems} onDelete={(row) => actions.deleteRecord?.('contact-items', row)} onRestore={(row) => actions.restoreRecord?.('contact-items', row)} />
  if (path === '/admin/media') return <MediaPage openEditor={openEditor} media={data.media} onDelete={(row) => actions.deleteRecord?.('media', row)} onRestore={(row) => actions.restoreRecord?.('media', row)} />
  if (path === '/admin/settings') return <SettingsPage openEditor={openEditor} settings={data.settings} />
  return <NotFoundPage />
}
