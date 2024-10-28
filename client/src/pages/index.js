import Main from './components/Main'

export default function Home() {

  return (
    <div className="bg-white h-[calc(100vh-72px)] font-roboto">
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


