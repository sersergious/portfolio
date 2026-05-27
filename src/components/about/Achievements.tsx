import { Medal, Trophy, Code, Brain } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/transitions';

export function Achievements() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Medal className="w-16 h-16 text-warning mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Competition Achievements
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Years of competing have sharpened my problem-solving skills and
            mathematical thinking
          </p>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StaggerItem>
            <div className="text-center p-6 bg-base-100 border border-base-300 rounded-lg hover:border-primary transition-colors">
              <Trophy className="w-10 h-10 text-warning mx-auto mb-4" />
              <h3 className="font-semibold mb-2">High School Honors Diploma</h3>
              <p className="text-sm text-base-content/60">
                Awarded with a Gold Medal
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="text-center p-6 bg-base-100 border border-base-300 rounded-lg hover:border-primary transition-colors">
              <Code className="w-10 h-10 text-info mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Math and CS Olympiads</h3>
              <p className="text-sm text-base-content/60">
                Multiple First Places
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="text-center p-6 bg-base-100 border border-base-300 rounded-lg hover:border-primary transition-colors">
              <Brain className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Dean&apos;s List Nominee</h3>
              <p className="text-sm text-base-content/60">6/6 Semesters</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
