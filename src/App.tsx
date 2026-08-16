import { motion } from "framer-motion";
import { 
  Leaf, 
  Store, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck 
} from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-green flex flex-col justify-between selection:bg-brand-leaf/20 relative overflow-hidden font-sans">
      {/* Background Decorative Subtle Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-leaf/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-earth/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-green flex items-center justify-center text-brand-sun shadow-sm">
            <Leaf size={22} className="rotate-12" />
          </div>
          <div>
            <span className="text-xl font-serif font-bold tracking-tight text-brand-green">
              Green World
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Hizmete Kapalı
        </div>
      </header>

      {/* Main Announcement Card */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl bg-white rounded-3xl p-8 sm:p-12 border border-brand-green/10 shadow-xl shadow-brand-green/5 text-center relative overflow-hidden"
        >
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-stone-300 via-stone-500 to-stone-300" />

          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-neutral-100 border border-neutral-200 text-neutral-600 mb-8 shadow-inner">
            <Store size={36} className="text-stone-600" />
          </div>

          {/* Headings */}
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 mb-3">
            Bilgilendirme ve Duyuru
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6 tracking-tight">
            Mağazamız Kapanmıştır
          </h1>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto font-sans">
            Green World olarak tüm tohum, canlı ve hobi ürünleri satışlarımız ile operasyonel faaliyetlerimiz <strong className="text-neutral-900 font-semibold">kalıcı olarak sonlandırılmıştır</strong>.
          </p>

          {/* Information Notice List */}
          <div className="bg-neutral-50 rounded-2xl p-5 sm:p-6 border border-neutral-200/80 text-left space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-neutral-500 mt-0.5 shrink-0" />
              <p className="text-sm text-neutral-700 leading-snug">
                Web sitemiz ve tüm iletişim kanallarımız üzerinden yeni sipariş kabulü yapılmamaktadır.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-neutral-500 mt-0.5 shrink-0" />
              <p className="text-sm text-neutral-700 leading-snug">
                Daha önce oluşturulmuş olan işlemler tamamlanmış olup sistemlerimiz arşive alınmıştır.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="text-neutral-500 mt-0.5 shrink-0" />
              <p className="text-sm text-neutral-700 leading-snug">
                Kişisel verileriniz ve iletişim bilgileriniz mevzuata uygun şekilde güvenle korunmakta veya silinmektedir.
              </p>
            </div>
          </div>

          {/* Thank you message */}
          <div className="pt-6 border-t border-neutral-100 flex flex-col items-center">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-1">
              Teşekkür Ederiz
            </p>
            <p className="text-sm text-neutral-600 italic font-serif">
              Bugüne kadar bize gösterdiğiniz ilgi, sevgi ve güven için teşekkürlerimizi sunarız.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-6 text-center text-xs text-neutral-400 z-10">
        <p>© 2026 Green World. Tüm hakları saklıdır. Faaliyetler sonlandırılmıştır.</p>
      </footer>
    </div>
  );
}
