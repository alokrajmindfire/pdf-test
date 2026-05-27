import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ArchivePage } from './pages/ArchivePage';
import { ClassDetailPage } from './pages/ClassDetailPage';
import { ClassesPage } from './pages/ClassesPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { SearchPage } from './pages/SearchPage';
import { SitemapPage } from './pages/SitemapPage';
import { SubjectPage } from './pages/SubjectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="classes/:classId" element={<ClassDetailPage />} />
          <Route path="classes/:classId/:subject" element={<SubjectPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="archive" element={<ArchivePage />} />
          <Route path="document/:docId" element={<DocumentDetailPage />} />
          <Route path="sitemap" element={<SitemapPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
