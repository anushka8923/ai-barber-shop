import Header from '../../components/header';
import Footer from '../../components/footer';
import Chatbot from '../../components/Chatbot';
import BackButton from '../../components/BackButton';

export default function PublicLayout({ children }) {
  // Ismein <html> ya <body> tags nahi hain, kyunki woh Root Layout se aa rahe hain.
  return (
    <>
      <Header />
      
      <main className="flex-grow">
        {children} {/* Aapke public pages (Home, About, etc.) ka content yahan dikhega */}
      </main>
      
      <Footer />

      <Chatbot /> {/* <-- CHATBOT COMPONENT YAHAN LAGA DIYA HAI */}
    </>
  );
}