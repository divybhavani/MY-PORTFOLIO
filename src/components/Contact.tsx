import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0, rotationX: 10, z: -100 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          z: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(formRef.current!);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(
          `Server returned non-JSON response. Status: ${response.status}. Content: ${text.substring(0, 50)}...`,
        );
      }

      if (response.ok) {
        if (formRef.current) formRef.current.reset();
        setIsSuccess(true);
      } else {
        alert(result?.error || "Failed to send message. Please try again.");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(`An error occurred: ${error.message || "Please try again later."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 py-32 px-4 max-w-7xl mx-auto"
      style={{ perspective: "1000px" }}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
          Let's <span className="text-gradient">Connect</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Interested in working together or have a project idea? Feel free to
          reach out.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
            <div className="space-y-6">
              <a
                href="mailto:techbydivy@gmail.com"
                className="flex items-center gap-4 text-gray-400 hover:text-[#22D3EE] transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#22D3EE]/20 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg text-white group-hover:text-[#22D3EE] transition-colors">
                    techbydivy@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {isSuccess ? (
            <div className="glass p-8 md:p-12 rounded-3xl space-y-6 flex flex-col items-center justify-center text-center min-h-[440px] animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-2 border border-green-500/30">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
              <p className="text-lg text-gray-400 max-w-sm">
                Thank you for reaching out. We will reach back to you shortly!
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors border border-white/5"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass p-8 md:p-12 rounded-3xl space-y-6 relative overflow-hidden transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-accent opacity-5 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent focus:bg-white/10 transition-all shadow-[0_0_0_rgba(139,92,246,0)] focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent focus:bg-white/10 transition-all shadow-[0_0_0_rgba(139,92,246,0)] focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent focus:bg-white/10 transition-all resize-none shadow-[0_0_0_rgba(139,92,246,0)] focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative px-8 py-4 bg-white text-black font-medium rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed z-10"
              >
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && (
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
