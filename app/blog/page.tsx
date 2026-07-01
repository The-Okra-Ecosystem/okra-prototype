import Hero from "@/components/Hero";
import PageCTA from "@/components/PageCTA";

export default function BlogPage() {
  const posts = [
    { date: 'MAY 12, 2026', title: 'The Future of Digital Spaces', category: 'DEV' },
    { date: 'APR 28, 2026', title: 'Announcing the 2026 Artist Roster', category: 'COLLECTIVE' },
    { date: 'APR 15, 2026', title: 'Ecosystem Scaling: Phase 2 Complete', category: 'ECOSYSTEM' },
    { date: 'MAR 30, 2026', title: 'Generative Landscapes in Architecture', category: 'ART' },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title="NEWSROOM"
        subtitle="Cultural updates and technical breakthroughs from the collective."
        imageKey="BLOG"
        button={{ label: 'Read the Field Notes', href: '/blog#posts' }}
      />
      
      <div id="posts" className="container-custom py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {posts.map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video bg-okra-deep/20 border border-white/5 mb-8 flex items-center justify-center transition-colors group-hover:border-okra-bright/50">
                <span className="text-okra-bright/20 font-oo-neureal text-4xl group-hover:text-okra-bright/40 transition-colors">
                  POST_THUMBNAIL
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs tracking-widest text-white/40">{post.date}</span>
                <span className="text-xs px-3 py-1 border border-okra-bright/30 text-okra-bright rounded-full">{post.category}</span>
              </div>
              <h3 className="text-4xl group-hover:text-okra-bright transition-colors">{post.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <PageCTA
        eyebrow="/ Stay Updated"
        title="NEVER MISS A DROP"
        description="Early access to events, panel talks, mentorships, films, and ticket releases — straight to your inbox."
        buttonLabel="Subscribe"
        buttonHref="/contact"
      />
    </div>
  );
}
