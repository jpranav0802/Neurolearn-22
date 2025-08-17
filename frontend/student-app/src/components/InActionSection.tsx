import React from 'react';
import LiquidGlassCard from './LiquidGlassCard';

const InActionSection: React.FC = () => {
  const actionItems = [
    {
      title: "Interactive Lessons",
      description: "Engaging lessons designed to capture and maintain children's attention, making learning an enjoyable experience.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZJfrvIPw5162IV4zoeRn-JPQeCIPETefZm7iOlVRcpJhpmM5s2aRaC_rJY2VxpNaxTijJEFyu2q1mZfMntIYDESCoM2kbFeRmz9slz-_nnydOHXxnWVOH6FHSbDnpFbZBIGYBwG6tao_9Qxs3swB0Wlt9gxCn9fQUi5OFMq_gds0mR7YByIMeWfZaeNpKOfd_i0kGRE9n00kj6IXkTOABu5_Qcbj-fuPIPy1ovCVqTcA3LWNXMHhk5CBFmAiI-T80pzS8WB33xE"
    },
    {
      title: "Adaptive Games",
      description: "Fun and educational games that adapt to each child's skill level, providing a personalized learning journey.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWVVTRvUsUzfI0wqrVmsgdcq7mlPWS2mwL_07G1qA8kYmVz-U0EmhzzRbhZbHnZB-bqFvXhyO9JV0VmwtlzALpEZ0Et8EIA0bnEJ8mRX45tk-GaechquiZR53vZjRnykZOouIBizYxX_RNc77QMIjV1jRyQuJG8tBlJDN5xhJbF6mCqEosOK2KipnEaEqzlTSBFzug6az8Ps3zKtxUC-YhatXGN23IHjAuSkCkjTTV5i07-txxT8YWCqJMbjNpdwsQH1aZ_4wzIvw"
    },
    {
      title: "Progress Tracking",
      description: "Track your child's progress and identify areas for growth with our comprehensive reporting tools.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzLOA91jQohW9QZthB-mwyuZ-Q0PN3mNc7K3bekGzdE0sV84Hnx2uQq036_QJmgzpjiTs-g5FS-qpamkiSMhpX9FBG0I7oImGrwu_aVKCX2bpJQiya-9IoZkFdxWzoQwVUq8mvjV_qzJ_hsJBzbkFQY-XqvfHyKxqiyoxbWdh7ezikzt0EjcF31hrS4FZAaIn_jnAP_pN-q1WPhkHAUbnFJySTGErIi_mNKIPThEm9mpA6oPqgQnMRZj_lW25p1Q6TZIEpJ7T48cc"
    }
  ];

  return (
    <section className="px-6 py-16 md:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            See Neurolearn in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Explore how our platform transforms learning for children on the autism
            spectrum.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {actionItems.map((item, index) => (
            <LiquidGlassCard 
              key={index}
              className="glass-float"
              style={{ animationDelay: `${index * 0.3}s` }}
              role="article"
              aria-labelledby={`action-${index}-title`}
            >
              <div className="flex flex-col gap-4">
                <div 
                  className="aspect-video w-full rounded-xl bg-cover bg-center shadow-lg overflow-hidden"
                  style={{ backgroundImage: `url("${item.image}")` }}
                  role="img"
                  aria-label={`${item.title} demonstration`}
                />
                <h3 id={`action-${index}-title`} className="text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="text-text-secondary">
                  {item.description}
                </p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InActionSection;
