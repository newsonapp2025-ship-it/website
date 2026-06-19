import { Link } from "react-router-dom";
import PolicyPageLayout from "@/components/PolicyPageLayout";

const EditorialPolicy = () => {
  return (
    <PolicyPageLayout
      title="Editorial Policy"
      subtitle="How NewsOn sources, presents, and maintains the news content on our platform."
    >
      <section>
        <h2>Purpose</h2>
        <p>
          This Editorial Policy explains how NewsOn selects, displays, and attributes news
          content. Transparency about our editorial practices helps readers understand what
          NewsOn is — and what it is not.
        </p>
      </section>

      <section>
        <h2>Content Sources</h2>
        <p>
          NewsOn aggregates news from established third-party publishers, news agencies, and
          RSS feeds from recognized media outlets. Content is selected based on relevance,
          timeliness, category, and language. We prioritize sources with a track record of
          public news reporting.
        </p>
        <p>
          NewsOn is a news aggregation and discovery platform. Unless explicitly stated,
          individual articles displayed on NewsOn are not written by NewsOn staff. The
          original publisher remains responsible for the accuracy and editorial standards of
          each story.
        </p>
      </section>

      <section>
        <h2>Attribution &amp; Original Sources</h2>
        <p>
          Every article on NewsOn includes, where available:
        </p>
        <ul>
          <li>The name of the original publisher or source</li>
          <li>The publication date and time</li>
          <li>A link to the full article on the publisher&apos;s website</li>
        </ul>
        <p>
          Readers are encouraged to visit the original source for the complete report,
          additional context, and updates. NewsOn does not republish full articles without
          permission; we display summaries and excerpts as permitted by our sources and
          applicable law.
        </p>
      </section>

      <section>
        <h2>Accuracy &amp; Corrections</h2>
        <p>
          We strive to present accurate metadata (headlines, dates, source names, and links).
          Because content originates from third parties, errors may occasionally appear in
          syndicated material.
        </p>
        <p>
          If you believe a story contains incorrect information, a broken link, or improper
          attribution, please contact us at{" "}
          <a href="mailto:support@newson.app" className="text-primary hover:underline">
            support@newson.app
          </a>
          . We review correction requests promptly and will update or remove content when
          appropriate.
        </p>
      </section>

      <section>
        <h2>Editorial Independence</h2>
        <p>
          NewsOn does not accept payment from publishers in exchange for featuring specific
          stories in our news feed. Advertising on our platform (where enabled) is clearly
          separated from editorial content and does not influence which news stories are
          shown.
        </p>
      </section>

      <section>
        <h2>No Endorsement</h2>
        <p>
          The inclusion of a story, publisher, or topic on NewsOn does not constitute an
          endorsement of any view, product, or service. Headlines and summaries reflect the
          original publisher&apos;s reporting, not the opinions of NewsOn.
        </p>
      </section>

      <section>
        <h2>User-Generated Content</h2>
        <p>
          NewsOn does not publish user-submitted news articles on our public website feed.
          Contact form submissions are used for support and feedback only and are not
          displayed as news content.
        </p>
      </section>

      <section>
        <h2>Advertising Disclosure</h2>
        <p>
          NewsOn may display advertisements through third-party ad networks such as Google
          AdSense. Ads are labeled and visually distinct from news content. Ad placement does
          not affect our news selection or editorial presentation.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Editorial Policy from time to time. Material changes will be
          reflected on this page with an updated revision date. Continued use of NewsOn
          constitutes acceptance of the current policy.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For editorial questions, source concerns, or correction requests:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@newson.app" className="text-primary hover:underline">
              support@newson.app
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <Link to="/#contact" className="text-primary hover:underline">
              Contact form
            </Link>
          </li>
        </ul>
        <p>
          Learn more about NewsOn on our{" "}
          <Link to="/about" className="text-primary hover:underline">
            About page
          </Link>
          .
        </p>
      </section>
    </PolicyPageLayout>
  );
};

export default EditorialPolicy;
