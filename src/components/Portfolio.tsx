import React, { useState, useEffect, useRef } from 'react';
import { Play, ExternalLink, Github, ArrowLeft, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  videoUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  thumbnail: string;
}

const projects: Project[] = [
  {
    id: 'ai-customer-acquisition',
    title: 'AI Customer Acquisition Engine',
    category: 'Revenue Acceleration',
    description: 'Intelligent system that multiplies customer acquisition through predictive targeting and automated nurturing.',
    fullDescription: 'We built an AI-powered customer acquisition engine that analyzes behavioral patterns, predicts high-value prospects, and automatically nurtures them through personalized touchpoints. The system integrates with existing CRM and marketing tools to create a seamless acquisition pipeline.',
    technologies: ['Machine Learning', 'Python', 'TensorFlow', 'React', 'Node.js', 'PostgreSQL'],
    videoUrl: '/hero_animation.mp4', // Using the same video as demo
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example',
    results: [
      { metric: '467%', value: 'Customer Acquisition Increase', description: 'Average increase in qualified leads' },
      { metric: '89%', value: 'Conversion Rate Improvement', description: 'From lead to paying customer' },
      { metric: '$2.4M', value: 'Additional Annual Revenue', description: 'Generated in first 6 months' }
    ],
    thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'intelligent-operations',
    title: 'Intelligent Operations Platform',
    category: 'Process Automation',
    description: 'AI system that eliminates 70% of routine decisions, freeing leadership for strategic thinking.',
    fullDescription: 'A comprehensive operations platform that uses AI to automate routine business decisions, optimize resource allocation, and predict operational bottlenecks before they occur. The system learns from historical data and continuously improves decision-making accuracy.',
    technologies: ['AI/ML', 'React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
    videoUrl: '/hero_animation.mp4',
    demoUrl: 'https://operations-demo.example.com',
    results: [
      { metric: '70%', value: 'Decision Automation', description: 'Routine decisions handled automatically' },
      { metric: '45%', value: 'Operational Efficiency', description: 'Improvement in process speed' },
      { metric: '89hrs', value: 'Weekly Time Saved', description: 'Leadership time reclaimed' }
    ],
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Market Analytics',
    category: 'Strategic Intelligence',
    description: 'Advanced analytics platform that predicts market opportunities 6 months ahead.',
    fullDescription: 'Our predictive analytics platform combines market data, competitor analysis, and consumer behavior patterns to forecast market opportunities with 94% accuracy. It provides actionable insights for strategic planning and investment decisions.',
    technologies: ['Python', 'Scikit-learn', 'D3.js', 'FastAPI', 'Redis', 'Kubernetes'],
    videoUrl: '/hero_animation.mp4',
    demoUrl: 'https://analytics-demo.example.com',
    githubUrl: 'https://github.com/analytics-example',
    results: [
      { metric: '94%', value: 'Prediction Accuracy', description: 'Market opportunity forecasting' },
      { metric: '6mo', value: 'Advance Warning', description: 'Market shift predictions' },
      { metric: '340%', value: 'ROI Improvement', description: 'On strategic investments' }
    ],
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'revenue-optimization',
    title: 'Revenue Optimization AI',
    category: 'Growth Acceleration',
    description: 'Dynamic pricing and revenue optimization system powered by real-time market intelligence.',
    fullDescription: 'An AI-driven revenue optimization platform that dynamically adjusts pricing strategies based on market conditions, competitor analysis, and demand patterns. The system maximizes revenue while maintaining competitive positioning.',
    technologies: ['Machine Learning', 'React', 'Python', 'Apache Kafka', 'Elasticsearch', 'GCP'],
    videoUrl: '/hero_animation.mp4',
    demoUrl: 'https://revenue-demo.example.com',
    results: [
      { metric: '28%', value: 'Revenue Increase', description: 'Through dynamic pricing' },
      { metric: '15%', value: 'Margin Improvement', description: 'Optimized pricing strategies' },
      { metric: '99.9%', value: 'System Uptime', description: 'Real-time optimization' }
    ],
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Fixed Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <source src="/hero_animation.mp4" type="video/mp4" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-light tracking-wider uppercase">Our Portfolio</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-white leading-tight mb-6">
              Proven{' '}
              <span 
                className="font-extralight italic"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Excellence
              </span>
            </h1>
            
            <p className="text-xl font-extralight text-white/80 max-w-3xl mx-auto leading-relaxed">
              Real projects. Real results. Real transformation. 
              See how we've helped businesses achieve exponential growth through intelligent AI systems.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project)}
                style={{
                  opacity: hoveredProject && hoveredProject !== project.id ? 0.6 : 1,
                  transform: hoveredProject === project.id ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                {/* Project Card */}
                <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden group-hover:border-red-600/30 transition-all duration-500">
                  {/* Thumbnail */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-light text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-white/70 font-extralight leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-md font-light"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-white/60 px-2 py-1">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {/* Key Metric */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-red-400">
                          {project.results[0].metric}
                        </div>
                        <div className="text-sm text-white/60 font-light">
                          {project.results[0].value}
                        </div>
                      </div>
                      
                      <div className="text-white/40 group-hover:text-red-400 transition-colors duration-300">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-black/90 backdrop-blur-md border border-white/20 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-red-600/20 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {/* Video Section */}
            <div className="relative h-96 bg-black rounded-t-3xl overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={selectedProject.thumbnail}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src={selectedProject.videoUrl} type="video/mp4" />
              </video>
              
              {/* Video Controls */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={toggleVideo}
                  className="w-20 h-20 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-red-600/20 text-red-400 text-sm font-medium px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                  
                  <div className="flex items-center space-x-4">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white/70 hover:text-red-400 transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Live Demo</span>
                      </a>
                    )}
                    
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white/70 hover:text-red-400 transition-colors duration-300"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                  </div>
                </div>
                
                <h2 className="text-4xl font-light text-white mb-4">
                  {selectedProject.title}
                </h2>
                
                <p className="text-lg font-extralight text-white/80 leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>
              
              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-light text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-white/10 text-white/90 px-4 py-2 rounded-lg font-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Results */}
              <div>
                <h3 className="text-xl font-light text-white mb-6">Key Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedProject.results.map((result, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-red-400 mb-2">
                        {result.metric}
                      </div>
                      <div className="text-white font-light mb-2">
                        {result.value}
                      </div>
                      <div className="text-white/60 text-sm font-extralight">
                        {result.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}