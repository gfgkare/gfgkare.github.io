import {
  CodeXml,
  Linkedin,
  Instagram,
  Globe,
  ArrowRight,
  MapIcon as WhatsappIcon,
  Rocket,
  Code,
  Users,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

function G2Success() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative min-h-screen bg-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#4285f4] opacity-10 rounded-full animate-float"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[200px] h-[200px] bg-[#ea4335] opacity-10 rounded-full animate-float-delayed"></div>
        </div>

        <div className="relative">
          <div className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-6">
              <CodeXml className="h-16 w-16 text-[#4285f4] animate-bounce" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#4285f4]">
              Registration Successful!
            </h1>

            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[#ea4335]">
              Welcome to G2HackFest!
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              We have received your application and it is currently under
              review. Get ready for an amazing hackathon experience!
            </p>

            <a
              href="https://chat.whatsapp.com/HPlAUayCEEEAiQ2jS6Mv7H"
              className="inline-flex items-center px-8 py-4 bg-[#34a853] hover:bg-[#035519] override-hover rounded-full font-semibold text-lg transition-all transform hover:scale-105 mb-12"
            >
              <WhatsappIcon className="h-6 w-6 mr-2" />
              Join WhatsApp Group
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-[#4285f4]">
                  Google Developer Groups
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://in.linkedin.com/company/gdg-kare"
                    className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-gray-700"
                  >
                    <Linkedin className="h-5 w-5 text-[#4285f4]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://www.instagram.com/gdg_oncampus_kare/"
                    className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-gray-700"
                  >
                    <Instagram className="h-5 w-5 text-[#ea4335]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://gdg.community.dev/gdg-on-campus-kalasalingam-academy-of-research-education-krishnankoil-india/"
                    className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-gray-700"
                  >
                    <Globe className="h-5 w-5 text-[#fbbc05]" />
                    <span>Event Page</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-[#23e210]">
                  GeeksforGeeks
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://in.linkedin.com/company/gfg-kare-student-chapter"
                    className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-gray-700"
                  >
                    <Linkedin className="h-5 w-5 text-[#4285f4]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://www.instagram.com/gfgkare/"
                    className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-gray-700"
                  >
                    <Instagram className="h-5 w-5 text-[#ea4335]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://gfgkare.github.io"
                    className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-gray-700"
                  >
                    <Globe className="h-5 w-5 text-[#fbbc05]" />
                    <span>Event Page</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Rocket className="h-10 w-10 mx-auto mb-4 text-[#4285f4]" />
                <h4 className="text-lg font-semibold mb-2 text-[#4285f4]">
                  Innovation Awaits
                </h4>
                <p className="text-gray-600">Turn your ideas into reality</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Code className="h-10 w-10 mx-auto mb-4 text-[#ea4335]" />
                <h4 className="text-lg font-semibold mb-2 text-[#ea4335]">
                  Code with Purpose
                </h4>
                <p className="text-gray-600">Build solutions that matter</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Users className="h-10 w-10 mx-auto mb-4 text-[#fbbc05]" />
                <h4 className="text-lg font-semibold mb-2 text-[#fbbc05]">
                  Network & Grow
                </h4>
                <p className="text-gray-600">Connect with fellow innovators</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Trophy className="h-10 w-10 mx-auto mb-4 text-[#34a853]" />
                <h4 className="text-lg font-semibold mb-2 text-[#34a853]">
                  Win Big
                </h4>
                <p className="text-gray-600">Amazing prizes await winners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default G2Success;
