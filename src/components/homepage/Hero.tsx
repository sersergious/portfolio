import {StaggerContainer} from "@/components/transitions/StaggerContainer";
import {StaggerItem} from "@/components/transitions/StaggerItem";
import {TypewriterText} from "@/components/transitions/TypewriterText";
import {ScaleOnHover} from "@/components/transitions/ScaleOnHover";
import Link from "next/link";
import {ArrowRight, Code, Github, Linkedin, Mail, MessageCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const socials = [
    {href: 'https://github.com/sersergious', icon: Github, label: 'GitHub'},
    {href: 'https://www.linkedin.com/in/sersergious-dev', icon: Linkedin, label: 'LinkedIn'},
    {href: 'mailto:hello@sersergious.dev', icon: Mail, label: 'Email'},
]

export function Hero() {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            <div
                className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto">
                <div className="container mx-auto px-4">
                    <StaggerContainer className="text-center max-w-4xl mx-auto">
                        {/* Main Heading */}
                        <StaggerItem>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                <span className="block">
                                      <TypewriterText
                                          text="Research."
                                          speed={120}
                                          delay={0}
                                          className="text-primary"
                                      />
                                </span>
                                <span className="block">
                                      <TypewriterText
                                          text="Develop."
                                          speed={120}
                                          delay={1.2}
                                          className="text-accent"
                                      />
                                </span>
                                <span className="block">
                                      <TypewriterText
                                          text="Innovate."
                                          speed={120}
                                          delay={2.4}
                                          className="gradient-text"
                                      />
                                </span>
                            </h1>
                        </StaggerItem>

                        {/* Subtitle */}
                        <StaggerItem delay={0.3}>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                                I'm a researcher and developer passionate about creating innovative solutions
                                at the intersection of <span
                                className="text-primary font-semibold">technology</span> and <span
                                className="text-accent font-semibold">science</span>.
                            </p>
                        </StaggerItem>

                        {/* CTA Buttons */}
                        <StaggerItem delay={0.6}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                                <ScaleOnHover>
                                    <Link
                                        href="/projects"
                                        className="btn-primary group flex items-center gap-2 px-6 py-3"
                                    >
                                        <Code className="w-5 h-5"/>
                                        View Projects
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                                    </Link>
                                </ScaleOnHover>

                                <ScaleOnHover>
                                    <Link
                                        href="/chat"
                                        className="btn-secondary group flex items-center gap-2 px-6 py-3"
                                    >
                                        <MessageCircle className="w-5 h-5"/>
                                        Chat with AI Assistant
                                    </Link>
                                </ScaleOnHover>
                            </div>
                        </StaggerItem>

                        {/* Social Links */}
                        <StaggerItem delay={0.9}>
                            <div className="flex justify-center gap-4">
                                {socials.map((social) => (
                                    <ScaleOnHover key={social.label}>
                                        <Link href={social.href} target="_blank" rel="noopener noreferrer">
                                            <Button
                                                asChild
                                                variant="ghost"
                                                size="icon"
                                                className="w-11 h-11 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                            >
                                                <span>
                                                  <social.icon className="w-5 h-5"/>
                                                  <span className="sr-only">{social.label}</span>
                                                </span>
                                            </Button>
                                        </Link>
                                    </ScaleOnHover>
                                ))}
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
                {/*Hero Image*/}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <div
                        className="relative aspect-square w-[300px] sm:w-[350px] lg:w-[400px] rounded-2xl overflow-hidden">
                        <Image
                            src="/images/hero-img.png"
                            alt="Hero image"
                            fill
                            className="object-cover rounded-2xl"
                            priority
                        />
                    </div>
                </div>

            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"/>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl"/>
            </div>
        </section>
    );
}