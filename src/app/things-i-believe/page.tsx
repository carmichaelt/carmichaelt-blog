import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/app/_components/container";

export const experimental_ppr = true;

export default async function ThingsIBelieve() {
  return (
    <>
      <div className="flex flex-1 mt-16 mb-16">
        <Container>
          <div className="flex w-full max-w-4xl mx-auto flex-col">
            {/* Back Button */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-purple-600">
                  Things I Believe
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  By Tom Carmichael
                </p>
              </div>

              <div className="space-y-10 text-sm sm:text-base">
                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Dont stress people out.
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Users will shun stressful apps.</li>
                    <li>Stress hides in noise, complexity and quantity.</li>
                    <li>Clever is not always better.</li>
                    <li>
                      AI has potential to reduce stress factors.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Trust is better than speed.
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Speed works before you gain trust. Trust is then maintained by quality.</li>
                    <li>Use speed and feedback to align with user expectations.</li>
                    <li>Authenticity builds trust.</li>
                    <li>Don't trick the audience.</li>
                    <li>Own mistakes and misunderstandings.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Complexity requires permanent focus and attention.
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Put in the hours, but get something back.</li>
                    <li>Iteratively focus in and out.</li>
                    <li>Small teams can focus, big teams can't.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Trust erodes through miscommunication.
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Get to the point, lead with the answer.</li>
                    <li>Leaders provide clarity and assurance when absent</li>
                    <li>Listen twice as much as you talk.</li>
                    <li>Mismatched expectations lead to conflict.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Leadership means owning outcomes beyond the org chart
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Influence is more important than titles.</li>
                    <li>
                      Leaders have to do the work themselves and delegate
                    </li>
                    <li>Managers &gt;&lt; Leaders.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Work and hobbies can coexist.
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>
                      Lean into your curiosity
                    </li>
                    <li>A job becomes a passion when you care about the outcome.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Always try to assume good intent
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Lead with empathy and understanding.</li>
                    <li>Give people reasonable time and space.</li>
                    <li>
                      Criticism is good feedback if you listen unemotionally
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

