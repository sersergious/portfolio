// app/about/page.tsx
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
    Brain,
    Code,
    Cpu,
    GraduationCap,
    Heart,
    Lightbulb,
    Medal,
    Rocket,
    Shield,
    Target,
    Trophy,
    Zap,
    ArrowRight,
    Github,
    Linkedin,
    Mail,
    FileText
} from 'lucide-react'
import { FadeInWhenVisible } from '@/components/transitions/FadeInWhenVisible'
import { StaggerContainer } from '@/components/transitions/StaggerContainer'
import { StaggerItem } from '@/components/transitions/StaggerItem'
import { ScaleOnHover } from '@/components/transitions/ScaleOnHover'
import { TypewriterText } from '@/components/transitions/TypewriterText'

export const metadata: Metadata = {
    title: 'About Me',
    description: 'Passionate developer and researcher exploring the intersection of mathematics, computer science, and artificial intelligence',
}

export default function AboutPage() {
    const skills = [
        { name: 'Web Development', level: 90, color: 'bg-gb-blue' },
        { name: 'Mathematics', level: 95, color: 'bg-gb-purple' },
        { name: 'AI/ML Development', level: 70, color: 'bg-gb-green' },
        { name: 'Quantum Computing', level: 60, color: 'bg-gb-aqua' },
        { name: 'Cryptography', level: 75, color: 'bg-gb-orange' },
        { name: 'Problem Solving', level: 98, color: 'bg-gb-yellow' },
    ]

    const timeline = [
        {
            year: 'Childhood',
            title: 'The Spark',
            description: 'Fell in love with computers and mathematics. Started participating in competitions.',
            icon: Lightbulb,
        },
        {
            year: 'High School',
            title: 'Competition Years',
            description: 'Won multiple national mathematics and computer science competitions.',
            icon: Trophy,
        },
        {
            year: 'University',
            title: 'Expanding Horizons',
            description: 'Diving deep into web development, AI, and theoretical computer science.',
            icon: GraduationCap,
        },
        {
            year: 'Present',
            title: 'Research & Development',
            description: 'Building innovative solutions while preparing for PhD studies.',
            icon: Brain,
        },
        {
            year: 'Future',
            title: 'The Vision',
            description: 'PhD at the intersection of Math & CS, focusing on AI and quantum computing.',
            icon: Rocket,
        },
    ]

    const researchInterests = [
        {
            title: 'Artificial Intelligence',
            description: 'Exploring deep learning, neural networks, and AGI possibilities',
            icon: Brain,
            color: 'text-gb-green',
        },
        {
            title: 'Quantum Computing',
            description: 'Quantum algorithms and their applications in solving complex problems',
            icon: Cpu,
            color: 'text-gb-aqua',
        },
        {
            title: 'Cryptography',
            description: 'Classical and post-quantum cryptographic systems for secure communication',
            icon: Shield,
            color: 'text-gb-orange',
        },
        {
            title: 'Mathematics',
            description: 'Pure and applied mathematics, especially in computational contexts',
            icon: Target,
            color: 'text-gb-purple',
        },
    ]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <FadeInWhenVisible direction="up">
                            <div className="text-center mb-12">
                                <h1 className="text-5xl md:text-7xl font-bold mb-8">
                                    <span className="block mb-4">Hi, I'm</span>
                                    <TypewriterText
                                        text="Your Name"
                                        className="text-primary"
                                        speed={100}
                                    />
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                    A passionate developer and aspiring researcher on a mission to bridge
                                    <span className="text-primary font-semibold"> mathematics</span> and
                                    <span className="text-accent font-semibold"> computer science</span> to
                                    create technologies that make a lasting impact.
                                </p>
                            </div>
                        </FadeInWhenVisible>

                        {/* Quick Stats */}
                        <FadeInWhenVisible direction="up" delay={0.2}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
                                    <div className="text-sm text-muted-foreground">Years of Coding</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-accent mb-2">15+</div>
                                    <div className="text-sm text-muted-foreground">Competition Wins</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-gb-yellow mb-2">50+</div>
                                    <div className="text-sm text-muted-foreground">Projects Built</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-gb-green mb-2">∞</div>
                                    <div className="text-sm text-muted-foreground">Curiosity Level</div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
                </div>
            </section>

            {/* The Tony Stark Dream */}
            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4">
                    <FadeInWhenVisible direction="up">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
                                <Zap className="w-10 h-10 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Iron Man Dream</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Since childhood, I've been fascinated by Tony Stark - not for the suit, but for the mind behind it.
                                A genius who combines theoretical knowledge with practical engineering to solve impossible problems.
                                This dream has shaped my journey, pushing me to excel in mathematics, master programming,
                                and explore the cutting edge of technology.
                            </p>
                            <blockquote className="text-xl italic text-foreground/80 border-l-4 border-primary pl-6">
                                "Sometimes you gotta run before you can walk."
                            </blockquote>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <FadeInWhenVisible direction="up">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">My Journey</h2>
                    </FadeInWhenVisible>

                    <div className="max-w-4xl mx-auto">
                        <StaggerContainer className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

                            {timeline.map((item, index) => (
                                <StaggerItem key={index} delay={index * 0.1}>
                                    <div className="relative flex items-start mb-12 md:mb-16">
                                        {/* Icon */}
                                        <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center z-10 relative">
                                            <item.icon className="w-8 h-8 text-primary" />
                                        </div>

                                        {/* Content */}
                                        <div className="ml-6 flex-1">
                                            <div className="text-sm text-muted-foreground mb-1">{item.year}</div>
                                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4">
                    <FadeInWhenVisible direction="up">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Skills & Expertise</h2>
                    </FadeInWhenVisible>

                    <div className="max-w-4xl mx-auto">
                        <StaggerContainer className="space-y-6">
                            {skills.map((skill, index) => (
                                <StaggerItem key={index} delay={index * 0.05}>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium">{skill.name}</span>
                                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${skill.color} transition-all duration-1000 ease-out`}
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        <FadeInWhenVisible direction="up" delay={0.5}>
                            <div className="mt-12 grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Code className="w-5 h-5 text-primary" />
                                        Development
                                    </h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li>• Full-stack web development (Next.js, React, Node.js)</li>
                                        <li>• TypeScript, Python, C++, Rust</li>
                                        <li>• Database design and optimization</li>
                                        <li>• Cloud architecture (AWS, Vercel)</li>
                                        <li>• AI/ML frameworks (TensorFlow, PyTorch)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Brain className="w-5 h-5 text-accent" />
                                        Research & Theory
                                    </h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li>• Advanced mathematics and algorithms</li>
                                        <li>• Machine learning and deep learning</li>
                                        <li>• Quantum computing fundamentals</li>
                                        <li>• Cryptographic protocols</li>
                                        <li>• Computational complexity theory</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </section>

            {/* Research Interests */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <FadeInWhenVisible direction="up">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Interests</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                My research focuses on the intersection of theoretical foundations and practical applications
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {researchInterests.map((interest, index) => (
                            <StaggerItem key={index} delay={index * 0.1}>
                                <ScaleOnHover scale={1.02}>
                                    <div className="bg-card border border-border rounded-lg p-6 h-full hover:border-primary/50 transition-colors">
                                        <interest.icon className={`w-12 h-12 ${interest.color} mb-4`} />
                                        <h3 className="text-xl font-semibold mb-3">{interest.title}</h3>
                                        <p className="text-muted-foreground">{interest.description}</p>
                                    </div>
                                </ScaleOnHover>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Competition Achievements */}
            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4">
                    <FadeInWhenVisible direction="up">
                        <div className="text-center mb-16">
                            <Medal className="w-16 h-16 text-gb-yellow mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Competition Achievements</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Years of competing have sharpened my problem-solving skills and mathematical thinking
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <StaggerItem>
                            <div className="text-center p-6 bg-card border border-border rounded-lg">
                                <Trophy className="w-10 h-10 text-gb-yellow mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">National Math Olympiad</h3>
                                <p className="text-sm text-muted-foreground">Gold Medal Winner</p>
                            </div>
                        </StaggerItem>

                        <StaggerItem delay={0.1}>
                            <div className="text-center p-6 bg-card border border-border rounded-lg">
                                <Code className="w-10 h-10 text-gb-blue mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">Programming Championships</h3>
                                <p className="text-sm text-muted-foreground">Multiple First Places</p>
                            </div>
                        </StaggerItem>

                        <StaggerItem delay={0.2}>
                            <div className="text-center p-6 bg-card border border-border rounded-lg">
                                <Brain className="w-10 h-10 text-gb-purple mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">AI/ML Hackathons</h3>
                                <p className="text-sm text-muted-foreground">Innovation Awards</p>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <FadeInWhenVisible direction="up">
                        <div className="max-w-4xl mx-auto text-center">
                            <Rocket className="w-16 h-16 text-primary mx-auto mb-8" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking Forward</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                My goal is to pursue a PhD at the intersection of mathematics and computer science,
                                focusing on AI, quantum computing, and cryptography. I believe these fields hold
                                the key to solving humanity's greatest challenges - from climate change to disease
                                to expanding our understanding of the universe itself.
                            </p>
                            <p className="text-xl font-medium text-foreground mb-12">
                                I want to build technologies that don't just solve today's problems,
                                but create possibilities we haven't even imagined yet.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <ScaleOnHover>
                                    <Link
                                        href="/research"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                    >
                                        <FileText className="w-5 h-5" />
                                        View My Research
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </ScaleOnHover>

                                <ScaleOnHover>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                                    >
                                        <Mail className="w-5 h-5" />
                                        Get In Touch
                                    </Link>
                                </ScaleOnHover>
                            </div>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* Personal Philosophy */}
            <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="container mx-auto px-4">
                    <FadeInWhenVisible direction="up">
                        <div className="max-w-3xl mx-auto text-center">
                            <Heart className="w-12 h-12 text-destructive mx-auto mb-6" />
                            <h3 className="text-2xl font-bold mb-6">What Drives Me</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Beyond the code and equations, I'm driven by a deep curiosity about how things work
                                and a desire to push the boundaries of what's possible. Every problem is a puzzle
                                waiting to be solved, every limitation an opportunity for innovation. I believe in
                                the power of technology to amplify human potential and create a better future for all.
                            </p>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>
        </div>
    )
}