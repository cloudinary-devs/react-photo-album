import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Welcome from './components/Welcome';

const Upload = lazy(() => import('./routes/Upload'));
const ApiUpload = lazy(() => import('./routes/ApiUpload'));
const Album = lazy(() => import('./routes/Album'));

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/upload"
          element={
            <Suspense fallback={<>Loading...</>}>
              <Upload />
            </Suspense>
          }
        />
        <Route
          path="/apiupload"
          element={
            <Suspense fallback={<>Loading...</>}>
              <ApiUpload />
            </Suspense>
          }
        />
        <Route
          path="/album"
          element={
            <Suspense fallback={<>Loading...</>}>
              <Album />
            </Suspense>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
