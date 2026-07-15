import { useRouter } from './hooks/useRouter';
import { parseDynamicUrl } from './utils/urlParser';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { AboutPage } from './pages/AboutPage';
import { DynamicCalculatorPage } from './pages/DynamicCalculatorPage';
import { GetYourPlanPage } from './pages/GetYourPlanPage';
import { SeoCalculatorPage } from './pages/SeoCalculatorPage';
import { LocationCalculatorPage } from './pages/LocationCalculatorPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { SavingsRunoutPage } from './pages/SavingsRunoutPage';
import { TakeHomePayPage } from './pages/TakeHomePayPage';
import { London50kPage } from './pages/London50kPage';
import { MortgageOptionsPage } from './pages/MortgageOptionsPage';
import { CarAffordabilityPage } from './pages/CarAffordabilityPage';
import { CarAffordabilityHubPage } from './pages/CarAffordabilityHubPage';
import { HowMuchCarPage } from './pages/HowMuchCarPage';
import { HouseAffordabilityPage } from './pages/HouseAffordabilityPage';
import { RentAffordabilityPage } from './pages/RentAffordabilityPage';
import { SavingsRunwayPage } from './pages/SavingsRunwayPage';
import { Is300MonthCarAffordablePage } from './pages/Is300MonthCarAffordablePage';
import { Is400MonthCarAffordablePage } from './pages/Is400MonthCarAffordablePage';
import { MortgageOn50kPage } from './pages/MortgageOn50kPage';
import { getCarAffordabilityPageBySlug } from './data/carAffordabilityPages';
import { getSeoPageBySlug } from './data/seoPages';
import { getLocationPageBySlug } from './data/locationPages';
import { getTakeHomePageBySlug } from './data/takeHomePages';

export default function App() {
  const { pathname, navigate } = useRouter();

  const renderPage = () => {
    if (pathname === '/' || pathname === '') {
      return <HomePage navigate={navigate} />;
    }

    if (pathname === '/calculators') {
      return <CalculatorsPage navigate={navigate} />;
    }

    if (pathname === '/about') {
      return <AboutPage navigate={navigate} />;
    }

    if (pathname === '/get-your-plan') {
      return <GetYourPlanPage navigate={navigate} />;
    }

    if (pathname === '/privacy-policy') {
      return <PrivacyPolicyPage navigate={navigate} />;
    }

    if (pathname === '/terms') {
      return <TermsPage navigate={navigate} />;
    }

    if (pathname === '/how-long-will-my-savings-last') {
      return <SavingsRunoutPage navigate={navigate} />;
    }

    if (pathname === '/can-i-afford-a-house-in-london-on-50k') {
      return <London50kPage navigate={navigate} />;
    }

    if (pathname === '/mortgage-options') {
      return <MortgageOptionsPage navigate={navigate} />;
    }

    if (pathname === '/car-affordability') {
      return <CarAffordabilityHubPage navigate={navigate} />;
    }

    if (pathname === '/how-much-should-i-spend-on-a-car-uk') {
      return <HowMuchCarPage navigate={navigate} />;
    }

    if (pathname === '/house-affordability') {
      return <HouseAffordabilityPage navigate={navigate} />;
    }

    if (pathname === '/rent-affordability') {
      return <RentAffordabilityPage navigate={navigate} />;
    }

    if (pathname === '/savings-runway') {
      return <SavingsRunwayPage navigate={navigate} />;
    }

    if (pathname === '/is-300-a-month-car-affordable-uk') {
      return <Is300MonthCarAffordablePage navigate={navigate} />;
    }

    if (pathname === '/is-400-a-month-car-affordable-uk') {
      return <Is400MonthCarAffordablePage navigate={navigate} />;
    }

    if (pathname === '/how-much-mortgage-can-i-afford-on-50k-salary-uk') {
      return <MortgageOn50kPage navigate={navigate} />;
    }

    const seoSlug = pathname.replace(/^\//, '');
    const seoPage = getSeoPageBySlug(seoSlug);
    if (seoPage) {
      return <SeoCalculatorPage page={seoPage} navigate={navigate} />;
    }

    const locationPage = getLocationPageBySlug(seoSlug);
    if (locationPage) {
      return <LocationCalculatorPage page={locationPage} navigate={navigate} />;
    }

    const takeHomePage = getTakeHomePageBySlug(seoSlug);
    if (takeHomePage) {
      return <TakeHomePayPage page={takeHomePage} navigate={navigate} />;
    }

    const carPage = getCarAffordabilityPageBySlug(seoSlug);
    if (carPage) {
      return <CarAffordabilityPage page={carPage} navigate={navigate} />;
    }

    const dynamicParams = parseDynamicUrl(pathname);
    if (dynamicParams) {
      return <DynamicCalculatorPage params={dynamicParams} navigate={navigate} />;
    }

    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Page not found</h1>
        <p className="text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
        >
          Go to homepage
        </button>
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header navigate={navigate} currentPath={pathname} />
      <div className="flex-1">{renderPage()}</div>
      <Footer navigate={navigate} />
    </div>
  );
}
