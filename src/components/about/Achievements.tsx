import { Medal, Trophy, Code, Brain } from "lucide-react";
import { FadeInWhenVisible } from "@/components/transitions/FadeInWhenVisible";
import { StaggerContainer } from "@/components/transitions/StaggerContainer";
import { StaggerItem } from "@/components/transitions/StaggerItem";

export const Achievements = () => {
  return (
    /* Competition Achievements */
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible direction="up">
          <div className="text-center mb-16">
            <Medal className="w-16 h-16 text-gb-yellow mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Competition Achievements
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Years of competing have sharpened my problem-solving skills and
              mathematical thinking
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StaggerItem>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <Trophy className="w-10 h-10 text-gb-yellow mx-auto mb-4" />
              <h3 className="font-semibold mb-2">High School Honors Diploma</h3>
              <p className="text-sm text-muted-foreground">
                Awarded with a Gold Medal
              </p>
            </div>
          </StaggerItem>

          <StaggerItem delay={0.1}>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <Code className="w-10 h-10 text-gb-blue mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Math and CS Olympiads</h3>
              <p className="text-sm text-muted-foreground">
                Multiple First Places
              </p>
            </div>
          </StaggerItem>

          <StaggerItem delay={0.2}>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <Brain className="w-10 h-10 text-gb-purple mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Dean's List Nominee</h3>
              <p className="text-sm text-muted-foreground">6/6 Semesters</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
