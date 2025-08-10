// components/hero/Hero.tsx
import {
  StaggerContainer,
  StaggerItem,
  TypewriterText,
  ScaleOnHover,
  AnimatedBackground,
  SlideIn,
} from "@/components/transitions";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const socials = [
  { href: "https://github.com/sersergious", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/sersergious-dev",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "mailto:hello@sersergious.dev", icon: Mail, label: "Email" },
];

export function Hero() {
  return (
    <section className="min-h-screen relative py-20 md:py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto">
        {/* Text Content Column */}
        <div className="w-full lg:w-1/2">
          <StaggerContainer className="text-center lg:text-left max-w-4xl lg:max-w-none">
            {/* Main Heading */}
            <StaggerItem>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block mb-4">
                  Hi, I'm
                  <TypewriterText
                    text=" Serhii Kuzmin"
                    className="text-primary"
                    speed={100}
                  />
                </span>
              </h1>
            </StaggerItem>

            {/* Hero Image - Mobile Only */}
            <StaggerItem
              className="lg:hidden flex justify-center mb-8"
              delay={0.2}
            >
              <div className="relative aspect-square w-[280px] sm:w-[320px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-img.png"
                  alt="Hero image"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </StaggerItem>

            {/* Subtitle */}
            <StaggerItem delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl lg:max-w-none">
                I'm a researcher and developer passionate about creating
                innovative solutions at the intersection of{" "}
                <span className="text-primary font-semibold">technology</span>{" "}
                and <span className="text-accent font-semibold">science</span>.
              </p>
            </StaggerItem>

            {/* CTA Buttons */}
            <StaggerItem delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                <ScaleOnHover>
                  <Link
                    href="/projects"
                    className="btn-primary group flex items-center gap-2 px-6 py-3"
                  >
                    <Code className="w-5 h-5" />
                    View Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ScaleOnHover>

                <ScaleOnHover>
                  <Link
                    href="/chat"
                    className="btn-secondary group flex items-center gap-2 px-6 py-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat with AI Assistant
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </ScaleOnHover>
              </div>
            </StaggerItem>

            {/* Social Links */}
            <StaggerItem delay={0.9}>
              <div className="flex justify-center lg:justify-start gap-4">
                {socials.map((social) => (
                  <ScaleOnHover key={social.label}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="w-11 h-11 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <span>
                          <social.icon className="w-5 h-5" />
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

        {/* Hero Image - Desktop Only */}
        <SlideIn
          from="right"
          delay={0.3}
          className="hidden lg:flex w-full lg:w-1/2 justify-center lg:justify-end"
        >
          <div className="relative aspect-square w-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/images/hero-img.png"
              alt="Hero image"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </SlideIn>
      </div>

      {/* Background Elements */}
      <AnimatedBackground />
    </section>
  );
}
