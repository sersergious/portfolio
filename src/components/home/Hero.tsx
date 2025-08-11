// components/home/Hero.tsx
import { TypewriterText, AnimatedBackground } from "@/components/transitions";
import Link from "next/link";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const socials = [
  { href: "https://github.com/sersergious", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/sersergious-dev",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "mailto:serhii.kuzmin@scranton.edu", icon: Mail, label: "Email" },
];

export function Hero() {
  return (
    <section className="min-h-screen relative py-20 md:py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto">
        {/* Text Content Column */}
        <div className="w-full lg:w-1/2">
          <div className="text-center lg:text-left max-w-4xl lg:max-w-none">
            {/* Main Heading */}
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

            {/* Hero Image - Mobile Only */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="relative aspect-square w-[280px] sm:w-[320px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-img.png"
                  alt="Hero image"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl lg:max-w-none">
              I'm a researcher and developer passionate about creating
              innovative solutions at the intersection of{" "}
              <span className="text-primary font-semibold">technology</span> and{" "}
              <span className="text-accent font-semibold">science</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              {/* Resume Button */}
              <a href="/docs/resume.pdf" download className="w-full sm:w-auto">
                <Button className="w-full" variant="default">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </a>

              {/* Unofficial Transcript Button */}
              <a
                href="/docs/unofficial-transcript.pdf"
                download
                className="w-full sm:w-auto"
              >
                <Button className="w-full" variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Download Transcript
                </Button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="w-11 h-11 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground hover:scale-105"
                  >
                    <span>
                      <social.icon className="w-5 h-5" />
                      <span className="sr-only">{social.label}</span>
                    </span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image - Desktop Only */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-center lg:justify-end">
          <div className="relative aspect-square w-[400px] rounded-2xl overflow-hidden">
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
      <AnimatedBackground />
    </section>
  );
}
