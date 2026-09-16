import { redirect } from 'next/navigation';

// Yeh component server par chalega.
// Jaise hi koi is page par aayega, yeh use turant redirect kar dega.
const MainPage = () => {

  // Ab '/' ki jagah '/PublicRoutes' par redirect kar rahe hain.
  redirect('/auth/login');

  return null; // Redirect ke baad return ki zaroorat nahi
};

export default MainPage;
