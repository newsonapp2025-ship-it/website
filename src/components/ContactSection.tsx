import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSubmitDataMutation } from "@/features/api/userapi";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "newson2025@gmail.com",
    subtitle: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "99442 77553",
    subtitle: "Mon–Fri, 9am–6pm IST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "513 Shamims Tower 1st Floor Thadagam Main Rd Rs Puram West Coimbatore Coimbatore South Coimbatore - 641002 Tamilnadu - India",
    // subtitle: "United States",
  },
];

const ContactSection = () => {

  const [postData] = useSubmitDataMutation()

  const [formData, setFormData] = useState({
    name: "",
    // email: "",
    subject: "",
    address: "",
    message: ""
  });
  const { toast } = useToast();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await postData(formData).unwrap();

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        // email: "",
        subject: "",
        address: "",
        message: ""
      });
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description:
          error?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            We'd Love to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Hear From You
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions, feedback, or partnership inquiries? Reach out and
            our team will get back to you shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >

            {/* <h3 className="text-xl font-bold text-foreground mb-2 mt-5">Our Information</h3> */}

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {info.title}
                  </h3>
                  <p className="text-primary font-medium">{info.detail}</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {info.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
            >
              <h3 className="font-semibold text-foreground mb-3">
                Follow Us
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Stay connected for news updates and announcements
              </p>
              <div className="flex gap-3">
                {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                  <button
                    key={social}
                    className="px-4 py-2 rounded-lg bg-card/80 border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </motion.div> */}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-card/50 border border-border/50 backdrop-blur-sm space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 h-12"
                  />
                </div>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary/50 h-12"
                />
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">
                  Your Address
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your address..."
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={1}
                  className="bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full group">
                <span>Send Message</span>
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* <p className="text-center text-muted-foreground text-sm">
                We typically respond within 24 hours
              </p> */}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
