import AppRouter from './routes/AppRouter';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <main className="p-4">
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
