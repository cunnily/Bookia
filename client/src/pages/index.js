import Main from './components/Main'

export default function Home() {

  return (
    <div className="bg-white min-h-screen font-roboto">
      <Main />
      {/* Responsive adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
          }
          nav div {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}


