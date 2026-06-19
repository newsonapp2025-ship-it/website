import { Link } from "react-router-dom";
import PolicyPageLayout from "@/components/PolicyPageLayout";
import { NEWS_LANGUAGES } from "@/config/languages";

const AboutPage = () => {
  const languageList = NEWS_LANGUAGES.map((lang) => lang.label).join(", ");

  return (
    <PolicyPageLayout
      title="About NewsOn"
      subtitle="A multilingual news platform helping readers stay informed with curated headlines from trusted sources."
    >
      <section>
        <h2>Who We Are</h2>
        <p>
          NewsOn is a digital news platform operated from Coimbatore, Tamil Nadu, India. We
          help readers discover timely headlines and stories across multiple Indian languages
          through our website and mobile applications.
        </p>
        <p>
          Our team curates and presents news from established publishers so you can browse
          stories in one place, in the language you prefer, and follow links to read the
          full report at the original source.
        </p>
      </section>

      <section>
        <h2>What We Do</h2>
        <p>
          NewsOn aggregates publicly available news from verified third-party publishers and
          news agencies. Each story on our platform includes the publisher name, publication
          time, and a direct link to the original article whenever the source provides one.
        </p>
        <p>
          We do not claim to be the original publisher of syndicated news content. Our role
          is to organize and surface relevant stories for readers. For full details on how we
          handle sources and attribution, please read our{" "}
          <Link to="/editorial-policy" className="text-primary hover:underline">
            Editorial Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2>Languages We Cover</h2>
        <p>
          NewsOn currently offers news in the following languages: {languageList}. We continue
          to expand coverage based on reader demand and source availability.
        </p>
      </section>

      <section>
        <h2>Our Mission</h2>
        <p>
          We believe staying informed should be simple and accessible. NewsOn is built to
          reduce friction between readers and reliable news — whether you prefer scanning
          headlines on the web or using our mobile app on the go.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          We welcome questions, feedback, and correction requests from readers and partners.
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@newson.app" className="text-primary hover:underline">
              support@newson.app
            </a>
          </li>
          <li>
            <strong>General inquiries:</strong>{" "}
            <a href="mailto:newson2025@gmail.com" className="text-primary hover:underline">
              newson2025@gmail.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong> +91 99442 77553
          </li>
          <li>
            <strong>Address:</strong> 513 Shamims Tower, 1st Floor, Thadagam Main Rd, RS
            Puram West, Coimbatore, Tamil Nadu 641002, India
          </li>
        </ul>
        <p>
          You can also reach us through the{" "}
          <Link to="/#contact" className="text-primary hover:underline">
            contact form
          </Link>{" "}
          on our homepage.
        </p>
      </section>
    </PolicyPageLayout>
  );
};

export default AboutPage;
