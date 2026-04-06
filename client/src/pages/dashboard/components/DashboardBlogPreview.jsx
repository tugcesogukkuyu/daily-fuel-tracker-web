import { Link } from "react-router-dom";
import { DASHBOARD_BLOG_PREVIEWS } from "../constants/dashboardData";

function DashboardBlogPreview() {
  return (
    <section className="dashboard-blog">
      <div className="blog-section">
        <div className="section-top">
          <h2>Blog</h2>
          <Link to="/blog" className="blog-link">
            Tümünü Görüntüle
          </Link>
        </div>

        <div className="blog-preview-grid">
          {DASHBOARD_BLOG_PREVIEWS.slice(0, 3).map((blogPreview) => (
            <Link
              key={blogPreview.slug}
              to={`/blog/${blogPreview.slug}`}
              className="blog-preview-card"
            >
              <img
                src={blogPreview.image}
                alt={blogPreview.title}
                className="dashboard-blog-image"
              />
              <h3>{blogPreview.title}</h3>
              <p>{blogPreview.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DashboardBlogPreview;
