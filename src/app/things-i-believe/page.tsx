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
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                  Things I Believe
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  By Tom Carmichael
                </p>
              </div>

              <div className="space-y-10 text-sm sm:text-base">
                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Shipping fast beats the best strategy
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Speed is a superpower</li>
                    <li>Create a bias toward shipping</li>
                    <li>Small teams ship faster</li>
                    <li>
                      AI-native teams will move 10x faster than those not
                      willing to change
                    </li>
                    <li>
                      Landings &gt; launches (i.e. product adoption &gt;
                      shipping code)
                    </li>
                    <li>
                      Listen, build, ship, tell the customer, then repeat
                      forever
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    You have no career ceiling
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Grit &gt; talent</li>
                    <li>There&apos;s no substitute for putting in the hours</li>
                    <li>Get 1% better every day</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Be ruthlessly truth seeking
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>The truth can be painful</li>
                    <li>You can just change your mind if wrong</li>
                    <li>Have strong opinions, loosely held</li>
                    <li>Maximize your exposure hours</li>
                    <li>&quot;Anecdata&quot; &gt; data</li>
                    <li>Seek the collective truth, not just one opinion</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Communication is the job
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Clear writing is clear thinking</li>
                    <li>
                      Everyone (yes, you) needs to become a better writer
                    </li>
                    <li>Leaders step up to provide clarity when absent</li>
                    <li>
                      Be the person taking notes, even if it&apos;s just for
                      yourself
                    </li>
                    <li>Mismatched expectations lead to sadness</li>
                    <li>
                      Slack pro tip: anticipate objections before hitting send,
                      then address them
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Education is the best form of developer marketing
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Be authentic and own your failures</li>
                    <li>Never use the word &quot;webinar&quot; ever again</li>
                    <li>Being helpful compounds</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Leadership means owning outcomes beyond the org chart
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Influence &gt; titles</li>
                    <li>
                      Leaders have to do the work themselves and delegate
                    </li>
                    <li>You can write your own playbook</li>
                    <li>
                      Study what worked for others, then take your own path
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Work can also be your hobby
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>This doesn&apos;t mean you can&apos;t have other hobbies</li>
                    <li>
                      Passion + boundaries &gt; mythical &quot;work-life
                      balance&quot;
                    </li>
                    <li>
                      Your best work comes from following your curiosity
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Demos &gt; memos
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>
                      You could have built a prototype in v0 during the meeting
                    </li>
                    <li>Only ship things you&apos;re excited about yourself</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Hiring is what separates good leaders from great
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>There are two hiring answers: hell yes or no</li>
                    <li>Growth potential &gt; current skill</li>
                    <li>Hire people you can learn from</li>
                    <li>
                      Hire people you would someday be happy working for
                    </li>
                    <li>
                      Favorite interview question: what work are you most proud
                      of?
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Always try to assume good intent
                  </h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-2">
                    <li>Lead with empathy</li>
                    <li>They might just be having a bad day</li>
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

