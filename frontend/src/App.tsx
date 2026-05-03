import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLoader from "@app/components/PageLoader";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import { JSX, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";

// Lazy loaded pages for code splitting
const Home = lazy(() => import("@app/pages/Home"));
const Projects = lazy(() => import("@app/pages/Projects"));
const About = lazy(() => import("@app/pages/About"));
const Contact = lazy(() => import("@app/pages/Contact"));

// Admin Pages
const AdminLogin = lazy(() => import("./admin/Login"));
const AdminDashboard = lazy(() => import("./admin/Dashboard"));
const ProjectAdmin = lazy(() => import("./admin/ProjectAdmin"));
const ExperienceAdmin = lazy(() => import("./admin/ExperienceAdmin"));
const HighlightAdmin = lazy(() => import("./admin/HighlightAdmin"));
const EducationAdmin = lazy(() => import("./admin/EducationAdmin"));
const ProfileAdmin = lazy(() => import("./admin/ProfileAdmin"));

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("admin_token");
  if (!token) return <AdminLogin />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main className="flex-1">
                  <Suspense fallback={<PageLoader />}>
                    <Home />
                  </Suspense>
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/projects"
            element={
              <>
                <Navbar />
                <main className="flex-1">
                  <Suspense fallback={<PageLoader />}>
                    <Projects />
                  </Suspense>
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <main className="flex-1">
                  <Suspense fallback={<PageLoader />}>
                    <About />
                  </Suspense>
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <main className="flex-1">
                  <Suspense fallback={<PageLoader />}>
                    <Contact />
                  </Suspense>
                </main>
                <Footer />
              </>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <AdminDashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <ProjectAdmin />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/experience"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <ExperienceAdmin />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/highlights"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <HighlightAdmin />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/education"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <EducationAdmin />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <ProfileAdmin />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
