import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useRef } from "react";
import { 
  Leaf, 
  ShoppingBag, 
  Phone, 
  Info, 
  MessageCircle,
  X, 
  ChevronRight, 
  Search,
  Menu,
  Instagram,
  Droplets,
  Sun,
  Sprout,
  Activity,
  Utensils,
  Globe,
  Clock,
  Thermometer,
  Heart
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

type Category = "Sebzeler" | "Meyveler" | "Böcekler";
type SubCategoryType = 
  | "Biber" 
  | "Domates" 
  | "Mısır" 
  | "Patlıcan" 
  | "Kabak" 
  | "Renkli Pazı" 
  | "Salatalık" 
  | "Tatsoi" 
  | "Mizuna" 
  | "Pak Choi" 
  | "Kıvırcık" 
  | "Ispanak"
  | "Karpuz"
  | "Göbek";

interface Product {
  id: string;
  name: string;
  category: Category;
  subCategory?: SubCategoryType;
  price: number;
  description: string;
  image: string;
  plantingSeason: string;
  harvestTime: string;
  difficulty: "Kolay" | "Orta" | "Zor";
  soilType: string;
  watering: string;
  sunlight: string;
  tips: string;
  scientificName?: string;
  family?: string;
  origin?: string;
  healthBenefits?: string[];
  usage?: string[];
  nutritionalValue?: { label: string; value: string }[];
}

// --- Mock Data ---

const PRODUCTS: Product[] = [
  {
    id: "11",
    name: "Gökkuşağı Pazı Tohumu",
    category: "Sebzeler",
    subCategory: "Renkli Pazı",
    price: 10,
    description: "Saplarının kırmızı, sarı, turuncu, pembe ve beyaz olmasıyla tanınan, hem dekoratif hem de besin deposu geleneksel pazı tohumu.",
    image: "https://lh3.googleusercontent.com/d/1JdYit7MCUgVmNR-sXpPEDgoriWUjoyp9",
    scientificName: "Beta vulgaris subsp. vulgaris",
    family: "Amaranthaceae (Ispanak ve pancar ailesi)",
    origin: "Akdeniz (Yunanistan, İtalya, Roma dönemi)",
    plantingSeason: "İlkbahar / Sonbahar",
    harvestTime: "45-60 Gün",
    difficulty: "Kolay",
    soilType: "Organik madde açısından zengin, iyi drenajlı toprak",
    watering: "Düzenli sulama, toprak nemli tutulmalı",
    sunlight: "Günde 4-6 saat güneş",
    tips: "Yapraklar kesilerek alınırsa bitki yeniden büyür. Balkonda 20-30 cm derinlikteki saksılarda yetiştirilebilir.",
    healthBenefits: [
      "Bağışıklığı güçlendirir (C vitamini ve antioksidan)",
      "Kemikleri güçlendirir (Yüksek K vitamini)",
      "Kalp sağlığını destekler (Potasyum ve magnezyum)",
      "Göz sağlığını korur (Lutein ve zeaksantin)",
      "Sindirim sistemini destekler (Lif kaynağı)"
    ],
    usage: [
      "Zeytinyağlı pazı yemekleri",
      "Pazı kavurma ve sarması",
      "Çorbalar ve smoothie karışımları",
      "Taze salatalar"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "19 kcal" },
      { label: "Lif", value: "1.6 g" },
      { label: "C Vitamini", value: "%30" },
      { label: "K Vitamini", value: "%300+" },
      { label: "A Vitamini", value: "%200" }
    ]
  },
  {
    id: "17",
    name: "Togo Patlıcan Tohumu",
    category: "Sebzeler",
    subCategory: "Patlıcan",
    price: 15,
    description: "Togo patlıcanı, Afrika kökenli bir patlıcan türüdür. Bilimsel adı Solanum aethiopicum olan bu bitki, özellikle Batı Afrika’da çok yaygındır. Meyveler küçük domates gibi yuvarlak olur. Tohum olarak satılmaktadır.",
    image: "https://lh3.googleusercontent.com/d/19Cdd6JRLRCWdCe4hzFhrYsJYSPii68IX",
    scientificName: "Solanum aethiopicum",
    family: "Solanaceae",
    origin: "Togo, Batı Afrika (Gana, Nijerya, Benin, Togo, Uganda)",
    plantingSeason: "İlkbahar",
    harvestTime: "70-90 Gün",
    difficulty: "Orta",
    soilType: "Organik maddece zengin, iyi drenajlı toprak (pH 5.5 – 7)",
    watering: "Düzenli sulama",
    sunlight: "Tropik ve sıcak iklim sever (20–35°C)",
    tips: "Saksıda yetiştirilebilir (25-30 cm saksı). Meyve rengi yeşilden sarı, turuncu ve kırmızıya döner. Bitki boyu 60-150 cm, meyve çapı 3-6 cm'dir.",
    healthBenefits: [
      "Bağışıklık: C vitamini içerir",
      "Kalp sağlığı: Potasyum sayesinde tansiyonu destekler",
      "Sindirim: Lif açısından zengindir",
      "Antioksidan: Serbest radikallere karşı koruyucu bileşikler içerir"
    ],
    usage: [
      "Sebze güveci",
      "Salata",
      "Çorba ve Soslar",
      "Baharatlı yemekler",
      "Afrika'da çiğ olarak da tüketilir"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "25 kcal" },
      { label: "Lif", value: "Yüksek" },
      { label: "C Vitamini", value: "Yüksek" },
      { label: "Potasyum", value: "İyi" },
      { label: "Antioksidan", value: "Çok Yüksek" }
    ]
  },
  {
    id: "18",
    name: "Bostan Patlıcan Tohumu",
    category: "Sebzeler",
    subCategory: "Patlıcan",
    price: 10,
    description: "Büyük, yuvarlak ve koyu mor renkli meyveleri ile tanınan, Türkiye'nin en sevilen patlıcan çeşitlerinden biridir. Kebap ve közleme için ideal olan bu patlıcanın atalık tohumudur.",
    image: "https://lh3.googleusercontent.com/d/18q6QAKC_sjkibIZ3hEXi4qNOtMwwKqP5",
    scientificName: "Solanum melongena",
    family: "Solanaceae",
    origin: "Hindistan, Myanmar, Çin (Anadolu ve Akdeniz mutfağı)",
    plantingSeason: "İlkbahar",
    harvestTime: "70-90 Gün",
    difficulty: "Orta",
    soilType: "Organik maddece zengin, iyi drenajlı toprak (pH 6 – 7)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak iklim sever (22–30°C)",
    tips: "Fideler 15–20 cm olunca dikilmelidir. İri ve etli meyveleri közleme için en iyi tercihtir. Saksıda (30-40 cm) yetiştirilebilir. Dikim aralığı: 70-90 cm x 40-60 cm.",
    healthBenefits: [
      "Kalp sağlığı: Kolesterol seviyelerini destekler",
      "Sindirim sistemi: Lif bakımından zengindir",
      "Beyin sağlığı: Nasunin antioksidanı hücreleri korur",
      "Düşük kalori: Diyetler için uygundur"
    ],
    usage: [
      "Karnıyarık",
      "İmam Bayıldı",
      "Hünkar Beğendi",
      "Patlıcan Kebabı",
      "Közlenmiş patlıcan salatası"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "25 kcal" },
      { label: "Lif", value: "3 g" },
      { label: "Potasyum", value: "Yüksek" },
      { label: "C Vitamini", value: "Orta" },
      { label: "Antioksidan", value: "Yüksek (Nasunin)" }
    ]
  },
  {
    id: "19",
    name: "Carolina Reaper Biber Tohumu 🌶️🔥",
    category: "Sebzeler",
    subCategory: "Biber",
    price: 25,
    description: "Carolina Reaper, dünyadaki en acı biberlerden biridir. Aşırı acılığı ve karakteristik kuyruklu (stinger) şekli ile tanınan bu efsanevi biberin tohumudur.",
    image: "https://lh3.googleusercontent.com/d/1xJXeowGC8-tIiPsHFgf1iYAM-Z4CeGWt",
    scientificName: "Capsicum chinense",
    family: "Solanaceae",
    origin: "South Carolina, ABD (PuckerButt Pepper Company - Ed Currie)",
    plantingSeason: "İlkbahar",
    harvestTime: "90-120 Gün",
    difficulty: "Zor",
    soilType: "İyi drenajlı, organik maddece zengin toprak (pH 6 – 6.8)",
    watering: "Düzenli sulama, toprak nemli tutulmalı",
    sunlight: "Sıcak iklim sever (22–32°C), günde 6-8 saat güneş",
    tips: "Dünyanın en acı biberidir (1.5M - 2.2M+ SHU). Saksıda (20-30 litre) yetiştirilebilir. Çimlenme süresi 10-21 gündür. ⚠️ GÜVENLİK: Çalışırken eldiven kullanın, göze dokunmayın. Çocuklardan kesinlikle uzak tutulmalıdır!",
    healthBenefits: [
      "Metabolizmayı hızlandırabilir",
      "Ağrı kesici etkileri olabilir",
      "Kan dolaşımını artırabilir"
    ],
    usage: [
      "Acı sos yapımı",
      "Baharat tozu",
      "Turşu",
      "Challenge videoları"
    ],
    nutritionalValue: [
      { label: "Acılık (SHU)", value: "1.5M - 2.2M+" },
      { label: "Kapsaisin", value: "Çok Yoğun" },
      { label: "C Vitamini", value: "Yüksek" }
    ]
  },
  {
    id: "20",
    name: "Kırmızı Top Biber Tohumu",
    category: "Sebzeler",
    subCategory: "Biber",
    price: 5,
    description: "Küçük, yuvarlak ve kırmızı renkte olan bir biber tohumudur. Cherry Pepper veya Cherry Bomb Pepper olarak da bilinir.",
    image: "https://lh3.googleusercontent.com/d/1K-iHbt6C6Havqfl7s4t56xHPaAo4qODn",
    scientificName: "Capsicum annuum",
    family: "Solanaceae (Biber ailesi)",
    origin: "Meksika, Peru, Bolivya",
    plantingSeason: "İlkbahar",
    harvestTime: "70-90 Gün",
    difficulty: "Orta",
    soilType: "İyi drenajlı, organik maddece zengin (pH 6-7)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak iklim, günde en az 6 saat güneş",
    tips: "Saksıda yetiştirilebilir (15-20 litre). Balkon yetiştiriciliği için idealdir.",
    healthBenefits: [
      "Bağışıklığı güçlendirir (C vitamini)",
      "Metabolizmayı hızlandırabilir (Capsaicin)",
      "Kalp sağlığını destekler (Antioksidan)",
      "Göz sağlığını korur (A vitamini)"
    ],
    usage: [
      "Turşu",
      "Dolma biber",
      "Salata",
      "Pizza",
      "Sandviç",
      "Sos"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "30 kcal" },
      { label: "C Vitamini", value: "Çok Yüksek" },
      { label: "A Vitamini", value: "Yüksek" },
      { label: "Lif", value: "İyi" },
      { label: "Antioksidan", value: "Yüksek" }
    ]
  },
  {
    id: "21",
    name: "Sarı Kıl Biber Tohumu",
    category: "Sebzeler",
    subCategory: "Biber",
    price: 15,
    description: "İnce, uzun ve sarı renkte olan bir biber tohumudur. Turşu, kızartma ve yemeklerde çok popülerdir.",
    image: "https://lh3.googleusercontent.com/d/1YXqNK5VdEBRNnZXCOC8Ht8AhzPA1bQmq",
    scientificName: "Capsicum annuum",
    family: "Solanaceae",
    origin: "Meksika, Peru, Bolivya",
    plantingSeason: "İlkbahar",
    harvestTime: "70-90 Gün",
    difficulty: "Orta",
    soilType: "İyi drenajlı, organik maddece zengin (pH 6-7)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak iklim, günde 6-8 saat güneş",
    tips: "Saksıda yetiştirilebilir (15-20 litre). Balkon yetiştiriciliği için uygundur.",
    healthBenefits: [
      "Bağışıklığı güçlendirir (C vitamini)",
      "Metabolizmayı hızlandırabilir (Capsaicin)",
      "Kalp sağlığını destekler (Antioksidan)",
      "Sindirim sistemini destekler (Lif)"
    ],
    usage: [
      "Turşu",
      "Kızartma",
      "Menemen",
      "Et yemekleri",
      "Kebap",
      "Salata"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "30 kcal" },
      { label: "C Vitamini", value: "Çok Yüksek" },
      { label: "A Vitamini", value: "Yüksek" },
      { label: "Lif", value: "Orta" },
      { label: "Antioksidan", value: "Yüksek" }
    ]
  },
  {
    id: "22",
    name: "Bulgar Yürek Domates Tohumu",
    category: "Sebzeler",
    subCategory: "Domates",
    price: 15,
    description: "Kalp şeklinde büyük meyveler veren eski (atalık) bir domates tohumudur. Tatlı, aromatik ve çok etli yapısıyla bilinir.",
    image: "https://lh3.googleusercontent.com/d/1h18xwUjKOu_SYqEito0vvpkgGjG7QvVI",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae",
    origin: "Bulgaristan",
    plantingSeason: "İlkbahar",
    harvestTime: "80-90 Gün",
    difficulty: "Orta",
    soilType: "Organik maddece zengin, iyi drenajlı (pH 6-6.8)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak ve güneşli iklim",
    tips: "Sırık domates olduğu için destek çubuğu veya ip sistemi gerekir. Saksıda (25-40 litre) yetiştirilebilir.",
    healthBenefits: [
      "Kalp sağlığını destekler (Lycopene)",
      "Bağışıklığı güçlendirir (C vitamini)",
      "Cilt sağlığına katkı sağlar",
      "Sindirim sistemini destekler"
    ],
    usage: [
      "Salata",
      "Sandviç",
      "Kahvaltı",
      "Domates suyu",
      "Sos"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "18 kcal" },
      { label: "C Vitamini", value: "Yüksek" },
      { label: "Potasyum", value: "İyi" },
      { label: "Lif", value: "Orta" }
    ]
  },
  {
    id: "23",
    name: "Yürek Domates Tohumu",
    category: "Sebzeler",
    subCategory: "Domates",
    price: 20,
    description: "Kalp şeklinde büyük meyveleri olan, çok etli ve az çekirdekli bir atalık domates tohumu grubudur.",
    image: "https://lh3.googleusercontent.com/d/104WJ7cXzwijjuHuN3B6hX5J7K7J56vr4",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae",
    origin: "İtalya, Rusya, Bulgaristan, ABD",
    plantingSeason: "İlkbahar",
    harvestTime: "80-95 Gün",
    difficulty: "Orta",
    soilType: "Organik maddece zengin, iyi drenajlı (pH 6-6.8)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak iklim, bol güneş",
    tips: "Sırık domates tipidir, destek sistemi gerekir. Saksıda (30-40 litre) yetiştirilebilir.",
    healthBenefits: [
      "Kalp sağlığını destekler",
      "Bağışıklığı güçlendirir",
      "Cilt sağlığı için faydalıdır",
      "Sindirim sistemini destekler"
    ],
    usage: [
      "Salata",
      "Sandviç",
      "Kahvaltı",
      "Domates sosu",
      "Domates püresi"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "18 kcal" },
      { label: "C Vitamini", value: "Yüksek" },
      { label: "Potasyum", value: "İyi" },
      { label: "Lif", value: "Orta" }
    ]
  },
  {
    id: "24",
    name: "Beykoz Dilimli Domates Tohumu",
    category: "Sebzeler",
    subCategory: "Domates",
    price: 15,
    description: "İstanbul Beykoz kökenli, büyük, kaburgalı (dilimli) ve güçlü aromalı bir yerel atalık domates tohumu çeşididir.",
    image: "https://lh3.googleusercontent.com/d/166ss00CPK_s62JEWicxaDzUG4PjvCHpv",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae",
    origin: "Beykoz, İstanbul",
    plantingSeason: "İlkbahar",
    harvestTime: "80-90 Gün",
    difficulty: "Orta",
    soilType: "Organik maddece zengin, iyi drenajlı (pH 6-6.8)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak ve güneşli iklim",
    tips: "Sırık domates tipidir, destek sistemi gerekir. Saksıda (30-40 litre) yetiştirilebilir.",
    healthBenefits: [
      "Kalp sağlığını destekler",
      "Bağışıklığı güçlendirir",
      "Cilt sağlığını korur",
      "Sindirim sistemini destekler"
    ],
    usage: [
      "Salata",
      "Kahvaltı",
      "Sandviç",
      "Sos",
      "Menemen"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "18 kcal" },
      { label: "C Vitamini", value: "Yüksek" },
      { label: "Potasyum", value: "İyi" },
      { label: "Lif", value: "Orta" }
    ]
  },
  {
    id: "25",
    name: "San Marzano Domates Tohumu",
    category: "Sebzeler",
    subCategory: "Domates",
    price: 15,
    description: "İtalya kökenli, uzun şekilli, çok etli ve dünyaca ünlü bir sosluk domates tohumu çeşididir.",
    image: "https://lh3.googleusercontent.com/d/1gMfbgr-pgmurfobyRuaPL8qn8zRuKw1k",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae",
    origin: "Campania, İtalya",
    plantingSeason: "İlkbahar",
    harvestTime: "80-90 Gün",
    difficulty: "Orta",
    soilType: "İyi drenajlı, organik maddece zengin (pH 6-6.8)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak ve güneşli iklim",
    tips: "Pizza ve makarna sosları için dünyanın en iyi domatesi olarak kabul edilir. Sırık tiptir, destek gerekir.",
    healthBenefits: [
      "Kalp sağlığını destekler",
      "Bağışıklığı güçlendirir",
      "Cilt sağlığına katkı sağlar",
      "Bağırsak sağlığını destekler"
    ],
    usage: [
      "Makarna sosu",
      "Pizza sosu",
      "Domates konservesi",
      "Güveç yemekleri"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "18 kcal" },
      { label: "C Vitamini", value: "Yüksek" },
      { label: "Potasyum", value: "İyi" },
      { label: "Lif", value: "Orta" }
    ]
  },
  {
    id: "26",
    name: "Beyaz Domates Tohumu",
    category: "Sebzeler",
    subCategory: "Domates",
    price: 20,
    description: "Soluk beyaz veya krem renkte, tatlı aromalı ve az asidik bir atalık domates tohumu çeşididir.",
    image: "https://lh3.googleusercontent.com/d/1PvpkEgy4L0bu-zb49Aq5WzAjib9kmkWL",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae",
    origin: "Amerika, Avrupa, Türkiye",
    plantingSeason: "İlkbahar",
    harvestTime: "75-90 Gün",
    difficulty: "Orta",
    soilType: "İyi drene edilmiş, organik maddece zengin (pH 6-6.8)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak ve güneşli iklim",
    tips: "Az asidik olduğu için mideyi yormaz. Saksıda (20-30 litre) yetiştirilebilir.",
    healthBenefits: [
      "Kalp sağlığını korur",
      "Göz sağlığını destekler (Lutein)",
      "Sindirim sistemini çalıştırır",
      "Bağışıklığı güçlendirir"
    ],
    usage: [
      "Salata",
      "Sandviç",
      "Domates sosu",
      "Dekoratif sunum",
      "Turşu"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "18 kcal" },
      { label: "C Vitamini", value: "Yüksek" },
      { label: "Potasyum", value: "İyi" },
      { label: "Lif", value: "Orta" }
    ]
  },
  {
    id: "27",
    name: "Göçmen Pembe Domates Tohumu",
    category: "Sebzeler",
    subCategory: "Domates",
    price: 15,
    description: "Türkiye’ye özgü atalık bir domates çeşididir. Büyük, pembe renkte ve etli meyveleri ile tanınır. Tatlı aromasıyla salatalarda çok tercih edilir.",
    image: "https://lh3.googleusercontent.com/d/1xYXoEY3Tm7694VAMgC-Tz0xTEkx5bxzw",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae",
    origin: "Türkiye (Marmara ve Ege Bölgesi)",
    plantingSeason: "İlkbahar",
    harvestTime: "75-90 Gün",
    difficulty: "Orta",
    soilType: "İyi drene edilmiş, organik maddece zengin (pH 6 – 6.8)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak ve güneşli iklim (20 – 30°C)",
    tips: "Sırık tip bitkilerde destek çubuğu veya kafes kullanmak gerekir. Saksıda (20-30 litre) yetiştirilebilir.",
    healthBenefits: [
      "Kalp sağlığını destekler (Lycopene)",
      "Göz sağlığını korur (Lutein ve β-karoten)",
      "Sindirim sistemini destekler (Lif)",
      "Bağışıklığı güçlendirir (C vitamini)"
    ],
    usage: [
      "Salata ve meyve tabakları",
      "Sandviç ve burger",
      "Hafif soslar ve kahvaltılık",
      "Menemen ve zeytinyağlı yemekler"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "18 kcal" },
      { label: "C Vitamini", value: "Yüksek" },
      { label: "Potasyum", value: "İyi" },
      { label: "Lif", value: "Orta" }
    ]
  },
  {
    id: "28",
    name: "Üzüm Çeri Domates Tohumu",
    category: "Sebzeler",
    subCategory: "Domates",
    price: 15,
    description: "Küçük ve uzun oval şekilli, üzüm benzeri salkım şeklinde büyüyen çok tatlı ve aromatik bir çeri domates çeşididir.",
    image: "https://lh3.googleusercontent.com/d/15o3sLzwSKCEjV-bNuGaVoZP18fpZ7ln8",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae",
    origin: "Hollanda veya ABD (Hibrit/Atalık varyeteleri mevcuttur)",
    plantingSeason: "İlkbahar",
    harvestTime: "60-75 Gün",
    difficulty: "Kolay",
    soilType: "İyi drene edilmiş, organik maddece zengin (pH 6 – 6.8)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak ve güneşli iklim (20 – 28°C)",
    tips: "Salkım yapısı sayesinde çok verimlidir. Saksıda (15-20 litre) yetiştirilebilir. Salkım destekleri önerilir.",
    healthBenefits: [
      "Kalp sağlığını destekler",
      "Bağışıklığı güçlendirir",
      "Sindirim sistemini destekler",
      "Göz sağlığını korur"
    ],
    usage: [
      "Salatalar ve renkli tabaklar",
      "Atıştırmalık ve kahvaltı tabakları",
      "Fırın yemekleri",
      "Sote ve soslar"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "18 kcal" },
      { label: "C Vitamini", value: "Yüksek" },
      { label: "Potasyum", value: "İyi" },
      { label: "Lif", value: "Orta" }
    ]
  },
  {
    id: "29",
    name: "İtalyan Heirloom Domates Tohumu",
    category: "Sebzeler",
    subCategory: "Domates",
    price: 20,
    description: "İtalya kökenli, büyük, aromatik ve çok etli atalık domates grubu. Pizza, sos ve taze tüketim için mükemmeldir.",
    image: "https://lh3.googleusercontent.com/d/1BUsn6IN-XrYdoPdlsmvr7dlJtylpvOsz",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae",
    origin: "İtalya (Campania, Toscana, Puglia, Sicilya)",
    plantingSeason: "İlkbahar",
    harvestTime: "75-95 Gün",
    difficulty: "Orta",
    soilType: "İyi drene edilmiş, organik maddece zengin (pH 6 – 6.8)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak ve güneşli iklim (20 – 30°C)",
    tips: "Sırık tip bitkiler için destek gerekir. Saksıda (25-40 litre) yetiştirilebilir. Sos ve pizza yapımında mükemmel sonuç verir.",
    healthBenefits: [
      "Kalp sağlığını destekler",
      "Bağışıklığı güçlendirir",
      "Sindirim sistemini destekler",
      "Cilt ve göz sağlığını korur"
    ],
    usage: [
      "Pizza ve makarna sosları",
      "Taze salatalar",
      "Domates konservesi",
      "Sandviç ve kahvaltılık"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "18 kcal" },
      { label: "C Vitamini", value: "Yüksek" },
      { label: "Potasyum", value: "İyi" },
      { label: "Lif", value: "Orta" }
    ]
  },
  {
    id: "30",
    name: "Renkli Mısır Tohumu",
    category: "Sebzeler",
    subCategory: "Mısır",
    price: 10,
    description: "Indian Corn veya Ornamental Corn olarak da bilinen, farklı renklerde tanelere sahip geleneksel mısır türü. Hem süsleme hem de beslenme amaçlı kullanılır.",
    image: "https://lh3.googleusercontent.com/d/161HeMLdBIVeH6Y1xsl7kzg-k-QYb-3vg",
    scientificName: "Zea mays",
    family: "Poaceae",
    origin: "Amerika kıtası (Güney ve Orta Amerika)",
    plantingSeason: "İlkbahar",
    harvestTime: "70-120 Gün",
    difficulty: "Orta",
    soilType: "İyi drene edilmiş, organik maddece zengin (pH 5.8 – 7.0)",
    watering: "Düzenli sulama",
    sunlight: "Sıcak ve güneşli iklim (18 – 30°C)",
    tips: "Minimum 40 litre saksı veya geniş bahçe alanı gerekir. Bol güneş ve düzenli sulama. Hasat zamanı dekorasyonu için popülerdir.",
    healthBenefits: [
      "Antioksidan kaynağı (Anthocyanin ve Karotenoidler)",
      "Kalp sağlığını destekler (Lif ve mineraller)",
      "Sindirim sistemini düzenler (Lif)",
      "Enerji verici (Karbonhidrat)",
      "Göz sağlığını korur (Karotenoidler)"
    ],
    usage: [
      "Süsleme ve dekorasyon",
      "Un ve mısır unu yapımı",
      "Patlamış mısır",
      "Geleneksel yemekler (Tortilla, Tamale)"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "365 kcal" },
      { label: "Karbonhidrat", value: "74 g" },
      { label: "Protein", value: "9 g" },
      { label: "Yağ", value: "4.7 g" },
      { label: "Lif", value: "7 g" }
    ]
  },
  {
    id: "31",
    name: "Meksika Karpuzu",
    category: "Meyveler",
    subCategory: "Karpuz",
    price: 15,
    description: "Meksika kökenli, orta ve küçük boylu, genellikle tatlı ve sulu bir karpuz çeşididir. İnce kabuklu yapısıyla balkon ve bahçe tarımı için idealdir.",
    image: "https://lh3.googleusercontent.com/d/11pA5tsyp5I1C16MlcXTD5QvYXxydYS4f",
    scientificName: "Citrullus lanatus",
    family: "Cucurbitaceae",
    origin: "Meksika ve Orta Amerika",
    plantingSeason: "İlkbahar / Yaz",
    harvestTime: "75-100 Gün",
    difficulty: "Orta",
    soilType: "İyi drene edilmiş, organik maddece zengin (pH 6 – 7.5)",
    watering: "Düzenli sulama, meyve olgunlaşırken azaltılmalı",
    sunlight: "Sıcak ve bol güneşli (22 – 32°C)",
    tips: "Saksıda yetiştirilecekse 50+ litrelik geniş saksılar kullanılmalıdır. Yayılıcı bir bitki olduğu için geniş alan veya dikey destek gerekebilir.",
    healthBenefits: [
      "Yüksek su oranı ile mükemmel hidrasyon sağlar",
      "Kalp sağlığını destekler (Potasyum ve Lycopene)",
      "Bağışıklık sistemini güçlendirir (C vitamini)",
      "Göz ve cilt sağlığını korur (Beta-karoten)",
      "Sindirim sistemini düzenler (Lif içeriği)"
    ],
    usage: [
      "Taze dilimlenmiş tüketim",
      "Meyve salataları",
      "Smoothie ve ferahlatıcı içecekler",
      "Meyve suyu ve dondurma yapımı"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "30 kcal" },
      { label: "Karbonhidrat", value: "7.6 g" },
      { label: "Protein", value: "0.6 g" },
      { label: "Yağ", value: "0.2 g" },
      { label: "Lif", value: "0.4 g" }
    ]
  },
  {
    id: "32",
    name: "Tereyağlı Göbek Marul",
    category: "Sebzeler",
    subCategory: "Göbek",
    price: 10,
    description: "Yumuşak yapraklı, hafif tatlı ve tereyağını andıran dokusuyla bilinen geleneksel marul çeşidi. Özellikle salatalar ve sandviçler için idealdir.",
    image: "https://lh3.googleusercontent.com/d/1nhUq-UcvMko6Y3sYRwmvc8pOLovbshle",
    scientificName: "Lactuca sativa",
    family: "Asteraceae",
    origin: "Avrupa ve Akdeniz bölgesi",
    plantingSeason: "Serin Mevsim (İlkbahar / Sonbahar)",
    harvestTime: "60-80 Gün",
    difficulty: "Kolay",
    soilType: "Hafif, iyi drene edilmiş, organik maddece zengin (pH 6-7)",
    watering: "Düzenli sulama, toprak nemli tutulmalı",
    sunlight: "Bol güneş veya yarı gölge (günde 4-6 saat)",
    tips: "Sıcak havalarda hızlı çiçeklenebilir, bu yüzden serin dönemlerde yetiştirilmesi önerilir. 15-20 litrelik saksılarda kolayca yetişir.",
    healthBenefits: [
      "Göz sağlığını destekler (Lutein ve zeaksantin)",
      "Bağışıklık sistemini güçlendirir (C vitamini)",
      "Kemik sağlığını korur (K vitamini ve kalsiyum)",
      "Sindirim sistemini düzenler (Lif içeriği)",
      "Düşük kalorili ve besleyicidir"
    ],
    usage: [
      "Taze salatalar",
      "Sandviç ve burger iç malzemesi",
      "Garnitür ve dekoratif tabaklar",
      "Kahvaltılık sunumlar"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "13 kcal" },
      { label: "Karbonhidrat", value: "2.9 g" },
      { label: "Protein", value: "1.4 g" },
      { label: "Yağ", value: "0.1 g" },
      { label: "Lif", value: "1.3 g" }
    ]
  },
  {
    id: "33",
    name: "Pak Choi (Çin Lahanası)",
    category: "Sebzeler",
    subCategory: "Pak Choi",
    price: 15,
    description: "Asya mutfağının vazgeçilmezi, hafif tatlı ve gevrek gövdeli egzotik sebze. Hem yaprakları hem de beyaz gövdesiyle eşsiz bir lezzet sunar.",
    image: "https://lh3.googleusercontent.com/d/1NHsYRPyaWCJXrvJysXnh5S2bCMblFkp-",
    scientificName: "Brassica rapa subsp. chinensis",
    family: "Brassicaceae (Lahana ailesi)",
    origin: "Çin ve Doğu Asya",
    plantingSeason: "İlkbahar / Sonbahar",
    harvestTime: "30-50 Gün",
    difficulty: "Kolay",
    soilType: "Hafif, iyi drene edilmiş, organik maddece zengin (pH 6-7)",
    watering: "Düzenli sulama, nemli toprak sever",
    sunlight: "Bol güneş veya hafif gölge",
    tips: "Hızlı büyüyen bir sebzedir. Baby Pak Choi tipleri saksıda çok hızlı sonuç verir. Sıcakta acılaşmaması için serin tutulmalıdır.",
    healthBenefits: [
      "Göz ve cilt sağlığını korur (A vitamini)",
      "Bağışıklığı güçlendirir (Yüksek C vitamini)",
      "Kemik sağlığını destekler (Kalsiyum ve K vitamini)",
      "Detoks etkisi sağlar (Glukosinolatlar)",
      "Kan şekeri yönetimine yardımcı olur"
    ],
    usage: [
      "Wok ve stir-fry yemekleri",
      "Çorba ve noodle yemekleri",
      "Buharda pişirme",
      "Taze salatalar",
      "Yeşil smoothie karışımları"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "13 kcal" },
      { label: "Karbonhidrat", value: "2.2 g" },
      { label: "Protein", value: "1.5 g" },
      { label: "Yağ", value: "0.2 g" },
      { label: "Lif", value: "1 g" }
    ]
  },
  {
    id: "34",
    name: "Çilek Ispanak",
    category: "Sebzeler",
    subCategory: "Ispanak",
    price: 20,
    description: "Hem yaprakları ıspanak gibi tüketilen hem de çileğe benzeyen tatlı kırmızı meyveler veren nadir ve dekoratif bir atalık bitki.",
    image: "https://lh3.googleusercontent.com/d/1PLO0ZK7o2wWMVyx9lJ6jR2VjFbVPp8AS",
    scientificName: "Chenopodium capitatum",
    family: "Amaranthaceae",
    origin: "Kuzey Amerika",
    plantingSeason: "İlkbahar / Sonbahar",
    harvestTime: "50-70 Gün",
    difficulty: "Kolay",
    soilType: "Hafif, iyi drene edilmiş, organik maddece zengin (pH 6-7.5)",
    watering: "Düzenli sulama",
    sunlight: "Bol güneş veya hafif gölge",
    tips: "Meyveler olgunlaştığında kırmızılaşır ve tatlanır. Hem görsel olarak bahçenize renk katar hem de mutfakta çift yönlü kullanım sağlar.",
    healthBenefits: [
      "Bağışıklık sistemini destekler (C vitamini)",
      "Göz sağlığını korur (Beta-karoten)",
      "Kemik sağlığını güçlendirir (K vitamini)",
      "Sindirim sistemini düzenler (Lif kaynağı)",
      "Yüksek antioksidan içeriğine sahiptir"
    ],
    usage: [
      "Yapraklar salata ve yemeklerde",
      "Meyveler taze tüketim veya tatlılarda",
      "Smoothie karışımları",
      "Garnitür ve dekoratif sunumlar"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "20 kcal" },
      { label: "Karbonhidrat", value: "3.5 g" },
      { label: "Protein", value: "2 g" },
      { label: "Yağ", value: "0.3 g" },
      { label: "Lif", value: "2 g" }
    ]
  },
  {
    id: "35",
    name: "Mizuna (Japon Hardalı)",
    category: "Sebzeler",
    subCategory: "Mizuna",
    price: 10,
    description: "Japon mutfağının vazgeçilmezi, ince parçalı yapraklı ve hafif acımsı aromalı, hızlı büyüyen ve yüksek verimli bir yeşillik.",
    image: "https://lh3.googleusercontent.com/d/1x5AvrUo8zi8S53OU7Ezre-d-nBkyhcVQ",
    scientificName: "Brassica rapa subsp. japonica",
    family: "Brassicaceae (Turpgiller)",
    origin: "Japonya",
    plantingSeason: "Serin Mevsim (İlkbahar / Sonbahar)",
    harvestTime: "30-50 Gün",
    difficulty: "Kolay",
    soilType: "Hafif, iyi drene edilmiş, organik maddece zengin (pH 6-7)",
    watering: "Düzenli sulama",
    sunlight: "Hafif güneş veya yarı gölge",
    tips: "Soğuğa dayanıklıdır ve çok hızlı büyür. Yaprakları kestikçe yeniden büyür, bu sayede uzun süre hasat imkanı sunar.",
    healthBenefits: [
      "Göz ve cilt sağlığını destekler (A vitamini)",
      "Bağışıklığı güçlendirir (C vitamini)",
      "Kemik sağlığını korur (K vitamini ve kalsiyum)",
      "Detoks ve anti-kanser özellikler (Glukosinolatlar)",
      "Düşük glisemik indeksli ve besleyicidir"
    ],
    usage: [
      "Taze salatalar",
      "Stir-fry ve wok yemekleri",
      "Çorba ve noodle yemekleri",
      "Smoothie ve yeşil içecekler",
      "Garnitür ve dekoratif sunum"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "15 kcal" },
      { label: "Karbonhidrat", value: "2.2 g" },
      { label: "Protein", value: "2 g" },
      { label: "Yağ", value: "0.2 g" },
      { label: "Lif", value: "1.5 g" }
    ]
  },
  {
    id: "36",
    name: "Dolmalık Kabak",
    category: "Sebzeler",
    subCategory: "Kabak",
    price: 10,
    description: "Sebze olarak tüketilen ve özellikle içi oyularak dolma yapılabilen, orta boy ve silindirik şekilli geleneksel kabak türü. Yaz aylarının vazgeçilmezidir.",
    image: "https://lh3.googleusercontent.com/d/1tX3rYal7HBYwfjnoHj-Wl-fCmpSEdCrM",
    scientificName: "Cucurbita pepo",
    family: "Cucurbitaceae",
    origin: "Orta ve Güney Amerika",
    plantingSeason: "Sıcak ve güneşli (20 – 30°C)",
    harvestTime: "50-70 Gün",
    difficulty: "Kolay",
    soilType: "İyi drene edilmiş, organik maddece zengin (pH 6-7)",
    watering: "Düzenli sulama",
    sunlight: "Bol güneşli",
    tips: "Saksıda yetiştirilecekse 30-40 litrelik saksılar yeterlidir. Yayılma alanı bırakılmalı veya dikey destek sağlanmalıdır.",
    healthBenefits: [
      "Sindirim sağlığını destekler (Lif içeriği)",
      "Bağışıklığı güçlendirir (C vitamini)",
      "Kalp sağlığını korur (Potasyum)",
      "Düşük kalorili diyetler için idealdir",
      "Antioksidan etkiler sağlar (Beta-karoten)"
    ],
    usage: [
      "Dolma ve iç harçlı yemekler",
      "Fırında veya tencerede pişirme",
      "Çorba ve sebze yemekleri",
      "Kavurma ve sote yemekleri",
      "Hafif yaz yemekleri"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "17 kcal" },
      { label: "Karbonhidrat", value: "3.1 g" },
      { label: "Protein", value: "1.2 g" },
      { label: "Yağ", value: "0.2 g" },
      { label: "Lif", value: "1 g" }
    ]
  },
  {
    id: "37",
    name: "Kamber Biber",
    category: "Sebzeler",
    subCategory: "Biber",
    price: 10,
    description: "Güneydoğu Anadolu ve Akdeniz bölgelerinde yetiştirilen, acı ve aromatik bir biber türü. Olgunlaştığında kırmızıya dönen, yoğun kokulu ve lezzetlidir.",
    image: "https://lh3.googleusercontent.com/d/1DwMHSepyOsTCQghfKfMnqMC7Sgz5jEAF",
    scientificName: "Capsicum annuum",
    family: "Solanaceae",
    origin: "Gaziantep, Şanlıurfa ve Mersin civarı",
    plantingSeason: "Sıcak ve güneşli",
    harvestTime: "Yaz sonu ve sonbahar",
    difficulty: "Orta",
    soilType: "Su tutma kapasitesi yüksek, humuslu ve iyi drene edilmiş",
    watering: "Düzenli sulama",
    sunlight: "Sıcak ve güneşli",
    tips: "Don olaylarına karşı hassastır. Fazla su kök çürümesine yol açabilir, bu yüzden drenaja dikkat edilmelidir.",
    healthBenefits: [
      "Sindirimi kolaylaştırır",
      "Metabolizmayı hızlandırır (Kapsaisin)",
      "Kan dolaşımını artırabilir",
      "Antioksidan özellikler taşır",
      "C ve A vitamini açısından zengindir"
    ],
    usage: [
      "Çorba ve et yemekleri",
      "Salça ve sos yapımı",
      "Pul biber veya toz biber (kurutulmuş)",
      "Taze tüketim"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "40 kcal" },
      { label: "Karbonhidrat", value: "9 g" },
      { label: "Protein", value: "2 g" },
      { label: "Yağ", value: "0.4 g" },
      { label: "C Vitamini", value: "Yüksek" }
    ]
  },
  {
    id: "38",
    name: "Japon Salatalığı",
    category: "Sebzeler",
    subCategory: "Salatalık",
    price: 20,
    description: "İnce, uzun ve çıtır yapısıyla bilinen Japonya kökenli salatalık türü. Az tohumlu, tatlı ve kabuğu soyulmadan tüketilebilen bir çeşittir.",
    image: "https://lh3.googleusercontent.com/d/1vqSJMYKSeuIPm6oUanIxLCBwSKFlWOnH",
    scientificName: "Cucumis sativus var. longissimus",
    family: "Cucurbitaceae",
    origin: "Japonya",
    plantingSeason: "Sıcak ve nemli (20–28°C)",
    harvestTime: "50–60 Gün",
    difficulty: "Kolay",
    soilType: "Organik maddece zengin, iyi drene edilmiş",
    watering: "Düzenli ve derin sulama",
    sunlight: "Sıcak ve nemli ortam",
    tips: "Meyve tutumu döneminde su kesilmemelidir. Fazla bekletilirse acılaşabilir, bu yüzden zamanında hasat edilmelidir.",
    healthBenefits: [
      "Yüksek hidrasyon sağlar (%95 su)",
      "Düşük kalorilidir, zayıflamaya yardımcı olur",
      "Sindirim sistemini destekler (Lif içeriği)",
      "C ve K vitamini kaynağıdır",
      "Potasyum ve magnezyum içerir"
    ],
    usage: [
      "Taze salatalar",
      "Turşu yapımı (Japon turşusu)",
      "Sushi ve Japon mutfağı",
      "Sağlıklı atıştırmalıklar"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "15 kcal" },
      { label: "Karbonhidrat", value: "3.6 g" },
      { label: "Protein", value: "0.7 g" },
      { label: "Yağ", value: "0.1 g" },
      { label: "Su Oranı", value: "%95" }
    ]
  },
  {
    id: "39",
    name: "Tatsoi (Asya Yeşilliği)",
    category: "Sebzeler",
    subCategory: "Tatsoi",
    price: 10,
    description: "Koyu yeşil, kaşık şeklinde yaprakları olan Asya kökenli besleyici bir sebze. Hafif tatlı ve cevizsi aromasıyla hem çiğ hem pişirilerek tüketilir.",
    image: "https://lh3.googleusercontent.com/d/1zDra20J3meDqHjTtAcrsyi8ilgPRt2RZ",
    scientificName: "Brassica rapa var. narinosa",
    family: "Brassicaceae (Çin lahanası ailesi)",
    origin: "Asya",
    plantingSeason: "Serin iklim (15–20°C)",
    harvestTime: "40–50 Gün",
    difficulty: "Kolay",
    soilType: "Humusça zengin, iyi drene edilmiş",
    watering: "Düzenli ve yeterli sulama",
    sunlight: "Serin veya yarı gölge alan",
    tips: "Sıcak havalarda yaprakları acılaşabilir, bu yüzden serin dönemlerde yetiştirilmesi önerilir. Düzenli hasat verimi artırır.",
    healthBenefits: [
      "A, C ve K vitaminleri açısından zengindir",
      "Güçlü antioksidan özellikler taşır",
      "Sindirim sistemini ve bağırsak sağlığını destekler",
      "Kemik sağlığını korur (Kalsiyum ve K vitamini)",
      "Kalp sağlığını destekler (Potasyum)"
    ],
    usage: [
      "Taze salatalar",
      "Sote ve Stir-fry yemekleri",
      "Sebze çorbaları",
      "Smoothie ve yeşil içecekler"
    ],
    nutritionalValue: [
      { label: "Kalori", value: "22 kcal" },
      { label: "Karbonhidrat", value: "3.9 g" },
      { label: "Protein", value: "2.2 g" },
      { label: "Demir", value: "Zengin" },
      { label: "Kalsiyum", value: "Yüksek" }
    ]
  },
  {
    id: "b1",
    name: "Dev Dikenli Yaprak Böceği",
    category: "Böcekler",
    price: 250,
    description: "Dünyadaki en ilginç kamuflaj ustası böceklerden biri. Vücudu kurumuş yaprak veya dal parçasına benzer, üzerinde diken benzeri çıkıntılar vardır.",
    image: "https://lh3.googleusercontent.com/d/1_6qnMtG8RdXTq6JD1IYbzlq75v1VHJl-",
    scientificName: "Extatosoma tiaratum",
    family: "Phasmatidae",
    origin: "Avustralya ve Yeni Gine",
    plantingSeason: "",
    harvestTime: "",
    difficulty: "Orta",
    soilType: "Orta boy ve yapraklı bir teraryum",
    watering: "Haftada 2-3 kez fısfıs",
    sunlight: "Gündüzü ve geceyi ayırt edebilecek şekilde",
    tips: "Okaliptüs, böğürtlen ve gül yaprakları ile beslenirler. Dişiler erkek olmadan da yumurta bırakabilir (Partenogenez).",
    healthBenefits: [],
    usage: [
      "Haftalık teraryum temizliği",
      "Dikey tırmanma dalları sağlanmalı",
      "Yüksek nem dengesi korunmalı",
      "Düzenli havalandırma"
    ],
    nutritionalValue: [
      { label: "Beslenme", value: "Böğürtlen, Gül, Ahududu, Okaliptüs Yaprağı" },
      { label: "Boyut", value: "15-20 cm (Dişi)" },
      { label: "Aktivite", value: "Gececil" }
    ]
  },
  {
    id: "b2",
    name: "Vietnam Çubuk Böceği",
    category: "Böcekler",
    price: 500,
    description: "Başlangıç seviyesi için en ideal çubuk böceği türüdür. İnce, uzun ve dal şeklinde bir vücuda sahiptir. Çok dayanıklı ve hızlı üreyen bir türdür.",
    image: "https://lh3.googleusercontent.com/d/1jptsEEfLzoHTR4_wrSszf7FQ7f8XPw4D",
    scientificName: "Medauroidea extradentata",
    family: "Phasmatidae",
    origin: "Vietnam",
    plantingSeason: "",
    harvestTime: "",
    difficulty: "Kolay",
    soilType: "Orta boy ve yapraklı bir teraryum",
    watering: "Haftada 2-3 kez fısfıs",
    sunlight: "Gündüzü ve geceyi ayırt edebilecek şekilde",
    tips: "Böğürtlen, ahududu ve gül yaprakları en sevdiği besinlerdir. Gece aktiftirler, gündüz dal gibi hareketsiz kalırlar.",
    healthBenefits: [],
    usage: [
      "Günlük nem kontrolü",
      "Taze yaprak temini",
      "Dikey yaşam alanı",
      "Kolay temizlenebilir taban"
    ],
    nutritionalValue: [
      { label: "Beslenme", value: "Böğürtlen, Gül, Ahududu, Okaliptüs Yaprağı" },
      { label: "Boyut", value: "10-12 cm" },
      { label: "Aktivite", value: "Gececil" }
    ]
  }
];

interface CartItem extends Product {
  quantity: number;
}

// --- Components ---

const InsectHero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-brand-green" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl bg-brand-green/70 backdrop-blur-md p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/20 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-12 md:w-16 h-0.5 bg-brand-sun" />
            <span className="text-brand-sun font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs">Mikro Dünyanın Gizemi</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-brand-cream mb-6 md:mb-8 leading-tight tracking-tight flex items-center gap-4 md:gap-6">
            Böcekler Dünyası
          </h1>
          <p className="text-base md:text-2xl text-brand-cream/90 mb-8 md:mb-12 leading-relaxed font-light">
            Böcekler, ekosistemimizin en önemli ve büyüleyici parçalarıdır. 
            Karmaşık yapıları, eşsiz renkleri ve inanılmaz kamuflaj yetenekleri ile mikro dünyanın kapılarını aralayın. 
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 py-8 md:py-10 border-t border-brand-cream/20">
            <div>
              <h4 className="text-brand-sun font-bold text-2xl md:text-3xl mb-2">Kamuflaj Ustaları</h4>
              <p className="text-brand-cream/70 text-xs md:text-sm italic leading-relaxed">Doğanın en iyi gizlenen canlıları ile tanışın.</p>
            </div>
            <div>
              <h4 className="text-brand-sun font-bold text-2xl md:text-3xl mb-2">Uzman Desteği</h4>
              <p className="text-brand-cream/70 text-xs md:text-sm italic leading-relaxed">Kurulumdan bakıma her adımda yanınızdayız.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};



const InsectSpotlight = ({ onCategorySelect, onDiscoverClick }: { onCategorySelect: (cat: Category | null) => void; onDiscoverClick: () => void }) => {
  return (
    <section className="py-24 bg-brand-green relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1534329535363-57c58eb3c3b5?auto=format&fit=crop&q=80&w=2000" 
          alt="Insect Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
          {/* Insects Block */}
          <div className="bg-brand-cream/10 backdrop-blur-md p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-0.5 bg-brand-sun" />
              <span className="text-brand-sun font-bold uppercase tracking-widest text-xs">Böcek Koleksiyonu</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-cream mb-6 leading-tight">
              Mikro Dostlar <br />
              <span className="italic text-brand-sun">Sizi Bekliyor</span>
            </h2>
            <p className="text-brand-cream/80 mb-10 leading-relaxed text-sm md:text-base">
              Doğanın en gizemli küçük canlılarıyla tanışın. Sağlıklı ve özel böcek koleksiyonumuzu keşfedin.
            </p>
            <button 
              onClick={() => {
                onCategorySelect("Böcekler");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-10 py-4 bg-brand-sun text-brand-green rounded-full font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Böcekleri Keşfet
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Seeds Block */}
          <div className="bg-brand-cream/10 backdrop-blur-md p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-0.5 bg-brand-leaf" />
              <span className="text-brand-leaf font-bold uppercase tracking-widest text-xs">Tohum Koleksiyonu</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-cream mb-6 leading-tight">
              Atalık Tohumlar <br />
              <span className="italic text-brand-leaf">Toprakla Buluşsun</span>
            </h2>
            <p className="text-brand-cream/80 mb-10 leading-relaxed text-sm md:text-base">
              Nesilden nesile aktarılan, genetiği korunmuş gerçek tohumlarla kendi bahçenizi kurun.
            </p>
            <button 
              onClick={onDiscoverClick}
              className="w-full sm:w-auto px-10 py-4 bg-brand-leaf text-brand-cream rounded-full font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Tohumları Keşfet
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Navbar = ({ 
  onCategorySelect, 
  onAboutOpen, 
  cartCount, 
  onCartOpen 
}: { 
  onCategorySelect: (cat: Category | null) => void; 
  onAboutOpen: () => void;
  cartCount: number;
  onCartOpen: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/95 backdrop-blur-md border-b border-brand-green/5">
      <div className="bg-brand-green text-brand-cream text-[10px] font-medium uppercase tracking-[0.3em] py-2 text-center px-4">
        Atalık Tohumlar & Egzotik Böcekler • Doğanın Tüm Renkleri
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onCategorySelect(null)}
          >
            <div 
              className="rounded-full overflow-hidden border-2 border-brand-green/10 shadow-md transition-transform group-hover:scale-110 bg-white p-0"
              style={{ width: 'clamp(60px, 15vw, 100px)', height: 'auto', aspectRatio: '1/1' }}
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1qoAJaUUiyoZEI96jVBEvBwZXH_vRsE6L" 
                alt="Green World Logo" 
                className="w-full h-full object-cover scale-[1.35]"
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-tight text-brand-green leading-none">Green World</span>
              <span className="text-[8px] text-brand-leaf font-bold tracking-[0.2em] uppercase mt-1">by MERCAN İZGİ</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {["Anasayfa", "Böcekler", "Sebzeler", "Meyveler", "Hakkımızda"].map((item) => (
                <button 
                  key={item}
                  onClick={() => {
                    if (item === "Hakkımızda") onAboutOpen();
                    else if (item === "Anasayfa") onCategorySelect(null);
                    else if (item === "Böcekler") onCategorySelect("Böcekler");
                    else onCategorySelect(item as Category);
                  }} 
                  className="text-brand-green/70 hover:text-brand-green transition-colors text-xs font-bold uppercase tracking-widest relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-leaf transition-all group-hover:w-full" />
                </button>
              ))}
            </div>
            
            <div className="h-6 w-px bg-brand-green/10" />

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={onCartOpen}
                  className="relative p-2 text-brand-green hover:text-brand-leaf transition-transform hover:scale-110"
                >
                  <ShoppingBag size={22} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-brand-bloom text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>

                <a 
                  href="https://instagram.com/greenworldofficiall" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-brand-green hover:text-brand-leaf transition-transform hover:scale-110"
                  title="Instagram'da bizi takip edin"
                >
                  <Instagram size={22} />
                </a>
              </div>

              <a 
                href="https://wa.me/905347636010" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-brand-green text-brand-cream px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-brand-leaf transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle size={14} />
                Sipariş Hattı
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onCartOpen}
              className="relative p-2 text-brand-green"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-leaf text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-brand-cream">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-brand-green">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-brand-cream border-b border-brand-green/10 p-4 space-y-4"
          >
            <button onClick={() => { onCategorySelect(null); setIsOpen(false); }} className="block w-full text-left p-2 hover:bg-brand-green/5 rounded-lg">Anasayfa</button>
            <button onClick={() => { onCategorySelect("Böcekler"); setIsOpen(false); }} className="block w-full text-left p-2 hover:bg-brand-green/5 rounded-lg">Böcekler</button>
            <button onClick={() => { onCategorySelect("Sebzeler"); setIsOpen(false); }} className="block w-full text-left p-2 hover:bg-brand-green/5 rounded-lg">Sebzeler</button>
            <button onClick={() => { onCategorySelect("Meyveler"); setIsOpen(false); }} className="block w-full text-left p-2 hover:bg-brand-green/5 rounded-lg">Meyveler</button>
            <button onClick={() => { onAboutOpen(); setIsOpen(false); }} className="block w-full text-left p-2 hover:bg-brand-green/5 rounded-lg">Hakkımızda</button>
            <div className="flex items-center gap-2 bg-brand-green text-brand-cream px-4 py-3 rounded-xl text-sm font-medium">
              <Phone size={16} />
              <a href="tel:05347636010">0534 763 60 10</a>
              <div className="w-px h-4 bg-brand-cream/20 mx-1"></div>
              <a 
                href="https://wa.me/905347636010" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onAboutOpen, onDiscoverClick }: { onAboutOpen: () => void; onDiscoverClick: () => void }) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(249,212,35,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(62,142,65,0.05),transparent_50%)]" />
      
      <div className="absolute top-0 right-0 -z-10 w-full lg:w-8/12 h-full opacity-95 lg:opacity-90 transition-all duration-1000 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-white z-10" />
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000" 
            alt="Forest" 
            className="w-full h-full object-cover lg:rounded-bl-[120px] saturate-[1.4] contrast-[1.2] brightness-[1.02]"
            referrerPolicy="no-referrer"
            loading="eager"
          />
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/40 shadow-2xl inline-block"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-brand-leaf" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-leaf">
                  Tohumlar & Böcekler
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-brand-green/20" />
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green/60">
                Kurucu: MERCAN İZGİ
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold leading-[1.1] md:leading-[0.95] mb-6 md:mb-8 text-black tracking-tighter drop-shadow-sm">
              Doğanın <br />
              <span className="italic text-brand-leaf font-medium">Eşsiz</span> <br />
              Dengesi
            </h1>
            
            <p className="text-base md:text-xl text-black mb-8 md:mb-12 leading-relaxed max-w-xl font-medium">
              Atalık tohumlarımızla toprağa hayat verin, egzotik dostlarımızla 
              doğanın gizemli dünyasını keşfedin. Yaşamın her formuna saygıyla.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
              <button 
                onClick={onDiscoverClick}
                className="w-full sm:w-auto px-8 md:px-10 py-4 gradient-leaf text-brand-cream rounded-full font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Koleksiyonu İncele
                <ChevronRight size={18} />
              </button>
              <button 
                onClick={onAboutOpen}
                className="w-full sm:w-auto px-8 md:px-10 py-4 gradient-leaf text-brand-cream rounded-full font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Hikayemiz
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Leaf className="text-brand-leaf" size={24} />,
      title: "Atalık Tohumlar",
      desc: "Hibrit olmayan, genetiği korunmuş geleneksel tohumlar."
    },
    {
      icon: <ShoppingBag className="text-brand-leaf" size={24} />,
      title: "Egzotik Böcekler",
      desc: "Sağlıklı ve özel böceklerle mikro dünyayı keşfedin."
    },
    {
      icon: <Info className="text-brand-leaf" size={24} />,
      title: "Uzman Desteği",
      desc: "Hem bitki hem canlı bakımı konusunda tam rehberlik."
    }
  ];

  return (
    <section className="bg-white py-16 border-y border-brand-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-leaf/5 flex items-center justify-center transition-colors group-hover:bg-brand-leaf/10">
                {f.icon}
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-green mb-1">{f.title}</h3>
                <p className="text-sm text-brand-earth leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, onInfoClick, onAddToCart }: { product: Product; onInfoClick: () => void; onAddToCart: () => void }) => {
  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-green/5 h-full flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-brand-green text-[9px] font-bold rounded-lg uppercase tracking-widest shadow-sm border border-brand-green/5">
            {product.category}
          </span>
        </div>
        {product.difficulty === "Kolay" && (
          <div className="absolute bottom-4 right-4">
            <span className="px-3 py-1 bg-brand-sun/90 backdrop-blur-sm text-brand-green text-[9px] font-bold rounded-lg uppercase tracking-widest shadow-sm">
              Başlangıç Seviyesi
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-serif font-bold text-brand-green group-hover:text-brand-leaf transition-colors leading-tight">{product.name}</h3>
          <span className="text-lg font-bold text-brand-green whitespace-nowrap">{product.price} ₺</span>
        </div>
        <p className="text-brand-earth text-sm line-clamp-2 mb-6 flex-grow leading-relaxed opacity-80">{product.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button 
            onClick={onInfoClick}
            className="flex items-center justify-center gap-2 py-3 bg-brand-cream text-brand-green rounded-xl hover:bg-brand-green hover:text-brand-cream transition-all border border-brand-green/10 text-[10px] font-bold uppercase tracking-widest"
          >
            İncele
          </button>
          <button 
            onClick={onAddToCart}
            className="flex items-center justify-center gap-2 py-3 bg-brand-green text-brand-cream rounded-xl hover:bg-brand-leaf transition-all text-[10px] font-bold uppercase tracking-widest shadow-md"
          >
            <ShoppingBag size={14} />
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductModal = ({ product, onClose, onAddToCart }: { product: Product; onClose: () => void; onAddToCart: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-green/40 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-brand-cream w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl relative my-8"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-lg hover:scale-110 active:scale-95"
        >
          <X size={20} className="text-brand-green" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Left Side: Image & Quick Info */}
          <div className="lg:w-5/12 relative bg-white flex flex-col shrink-0">
            <div className="aspect-square sm:aspect-video lg:aspect-auto lg:h-full relative overflow-hidden group bg-neutral-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/60 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <span className="px-3 md:px-4 py-1 md:py-1.5 bg-brand-green/90 backdrop-blur-md text-brand-cream text-[9px] md:text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
                    {product.category}
                  </span>
                  {product.origin && (
                    <span className="px-3 md:px-4 py-1 md:py-1.5 bg-brand-leaf/90 backdrop-blur-md text-brand-cream text-[9px] md:text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                      <Globe size={12} />
                      {product.origin}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg">{product.name}</h2>
              </div>
            </div>
          </div>

          {/* Right Side: Detailed Content */}
          <div className="lg:w-7/12 p-6 md:p-8 lg:p-14 overflow-y-auto bg-brand-cream/50 custom-scrollbar">
            <div className="max-w-2xl mx-auto">
              {/* Header Info */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-leaf/10 flex items-center justify-center text-brand-leaf">
                    <Sprout size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-leaf leading-none mb-1">Atalık Tohum Dünyası</p>
                    {product.scientificName && (
                      <p className="text-sm italic text-brand-earth/70">{product.scientificName}</p>
                    )}
                  </div>
                </div>
                
                <p className="text-lg text-brand-green/90 leading-relaxed font-serif italic">
                  "{product.description}"
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                {[
                  { label: "Ekim", value: product.plantingSeason, icon: Clock, show: product.category !== "Böcekler" },
                  { label: "Hasat", value: product.harvestTime, icon: Clock, show: product.category !== "Böcekler" },
                  { label: "Zorluk", value: product.difficulty, icon: Activity, show: true },
                  { label: "Güneş", value: product.sunlight, icon: Sun, show: product.category !== "Böcekler" }
                ].filter(item => item.show).map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-brand-green/5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2 text-brand-leaf/60">
                      <item.icon size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
                    </div>
                    <span className="text-xs font-bold text-brand-green block truncate">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Detailed Sections */}
              <div className="space-y-10">
                {/* Growing Details */}
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-green mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-brand-leaf/30" />
                    Yetiştirme Rehberi
                  </h3>
                  <div className="grid gap-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-earth/5 flex items-center justify-center text-brand-earth shrink-0">
                        <Droplets size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-brand-green mb-1">{product.category === "Böcekler" ? "Nem İhtiyacı" : "Sulama İhtiyacı"}</h4>
                        <p className="text-sm text-brand-earth/80 leading-relaxed">{product.watering}</p>
                      </div>
                    </div>
                    {product.category === "Böcekler" && (
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-earth/5 flex items-center justify-center text-brand-earth shrink-0">
                          <Sun size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-brand-green mb-1">Işık İhtiyacı</h4>
                          <p className="text-sm text-brand-earth/80 leading-relaxed">{product.sunlight}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-earth/5 flex items-center justify-center text-brand-earth shrink-0">
                        <Thermometer size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-brand-green mb-1">{product.category === "Böcekler" ? "Yaşam Alanı" : "Toprak Tercihi"}</h4>
                        <p className="text-sm text-brand-earth/80 leading-relaxed">{product.soilType}</p>
                      </div>
                    </div>
                    <div className="bg-brand-leaf/5 p-6 rounded-3xl border border-brand-leaf/10">
                      <div className="flex items-center gap-3 mb-3 text-brand-leaf">
                        <Info size={18} />
                        <h4 className="text-xs font-bold uppercase tracking-wider">Uzman Tavsiyesi</h4>
                      </div>
                      <p className="text-sm text-brand-green/80 leading-relaxed italic">
                        {product.tips}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Benefits & Usage */}
                {((product.healthBenefits && product.healthBenefits.length > 0) || (product.usage && product.usage.length > 0)) && (
                  <section className="grid md:grid-cols-2 gap-8">
                    {product.healthBenefits && product.healthBenefits.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-green mb-4 flex items-center gap-2">
                          <Activity size={16} className="text-brand-bloom" />
                          Faydaları
                        </h3>
                        <ul className="space-y-2">
                          {product.healthBenefits.map((benefit, i) => (
                            <li key={i} className="text-sm text-brand-earth/80 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-bloom/40 mt-1.5 shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.usage && product.usage.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-green mb-4 flex items-center gap-2">
                          {product.category === "Böcekler" ? <Heart size={16} className="text-brand-sun" /> : <Utensils size={16} className="text-brand-sun" />}
                          {product.category === "Böcekler" ? "Bakım" : "Kullanım"}
                        </h3>
                        <ul className="space-y-2">
                          {product.usage.map((use, i) => (
                            <li key={i} className="text-sm text-brand-earth/80 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-sun/40 mt-1.5 shrink-0" />
                              {use}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                )}

                {/* Nutritional Values */}
                {product.nutritionalValue && (
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-green mb-6 flex items-center gap-3">
                      <span className="w-8 h-px bg-brand-leaf/30" />
                      {product.category === "Böcekler" ? "Beslenme & Özellikler" : "Besin Değerleri (100g)"}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {product.nutritionalValue.map((item, i) => (
                        <div key={i} className="px-4 py-2 bg-white rounded-full border border-brand-green/5 shadow-sm flex items-center gap-3">
                          <span className="text-[10px] font-bold text-brand-earth/60 uppercase tracking-wider">{item.label}</span>
                          <span className="text-xs font-bold text-brand-green">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Footer Action */}
              <div className="mt-16 pt-10 border-t border-brand-green/10 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="text-center sm:text-left">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-earth/60 mb-2">Birim Fiyatı</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-brand-green">{product.price}</span>
                    <span className="text-xl font-bold text-brand-green">₺</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    onAddToCart();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-10 py-5 bg-brand-green text-brand-cream rounded-2xl font-bold hover:bg-brand-leaf transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-brand-leaf/20 hover:-translate-y-1 active:translate-y-0"
                >
                  <ShoppingBag size={22} />
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CartModal = ({ 
  cart, 
  onClose, 
  onRemove, 
  onUpdateQuantity 
}: { 
  cart: CartItem[]; 
  onClose: () => void; 
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-green/40 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-brand-cream w-full max-w-2xl rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative my-8"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-sm"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-green/5 rounded-2xl flex items-center justify-center text-brand-green mx-auto mb-6">
            <ShoppingBag size={28} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-brand-green mb-2">Sepetim</h2>
          <div className="w-12 h-1 bg-brand-leaf/20 mx-auto rounded-full"></div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-earth text-lg italic opacity-60">Sepetiniz şu an boş.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar mb-10">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-brand-green/5 shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded-xl" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="flex-grow">
                  <h4 className="font-serif font-bold text-brand-green text-lg">{item.name}</h4>
                  <p className="text-brand-leaf font-bold text-sm">{item.price} ₺</p>
                </div>
                <div className="flex items-center gap-3 bg-brand-cream rounded-lg p-1 border border-brand-green/5">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-brand-green hover:bg-brand-green hover:text-white transition-colors shadow-sm"
                  >
                    -
                  </button>
                  <span className="font-bold text-brand-green w-4 text-center text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-brand-green hover:bg-brand-green hover:text-white transition-colors shadow-sm"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-brand-earth/40 hover:text-brand-bloom transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="border-t border-brand-green/10 pt-8">
            <div className="flex justify-between items-center mb-10">
              <span className="text-lg font-serif font-bold text-brand-green">Toplam Tutar:</span>
              <span className="text-3xl font-bold text-brand-green">{total} ₺</span>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-brand-green/5 text-center mb-8 shadow-sm">
              <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-4 opacity-60">Sipariş Onayı</p>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://wa.me/905347636010" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  <MessageCircle size={20} />
                  WhatsApp ile Sipariş Ver
                </a>
                <a 
                  href="tel:05347636010"
                  className="flex items-center justify-center gap-2 text-brand-earth/60 text-xs mt-2 hover:text-brand-green transition-colors"
                >
                  <Phone size={12} />
                  <span>Veya bizi arayın: 0534 763 60 10</span>
                </a>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="w-full py-4 text-brand-green/60 hover:text-brand-green font-bold text-xs uppercase tracking-widest transition-all"
        >
          Alışverişe Devam Et
        </button>
      </motion.div>
    </motion.div>
  );
};

const AboutModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-green/40 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-brand-cream w-full max-w-3xl rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative my-8"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-sm"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-12">
          <div 
            className="rounded-full overflow-hidden border-4 border-brand-green/10 mx-auto mb-6 shadow-xl bg-white p-0"
            style={{ width: 'clamp(100px, 25vw, 140px)', height: 'auto', aspectRatio: '1/1' }}
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1qoAJaUUiyoZEI96jVBEvBwZXH_vRsE6L" 
              alt="Green World Logo" 
              className="w-full h-full object-cover scale-[1.35]"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <h2 className="text-4xl font-serif font-bold text-brand-green mb-4">Hikayemiz</h2>
          <div className="w-12 h-1 bg-brand-leaf/20 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8 text-brand-green/80 leading-relaxed text-lg font-serif">
          <p>
            <span className="font-bold text-brand-green">Green World</span>, kurucumuz <span className="font-bold text-brand-leaf uppercase">MERCAN İZGİ</span>'nin toprağa olan tutkusu ve doğanın her formuna duyduğu derin saygının bir meyvesi olarak doğdu. Bizim için bir tohum yaşamın başlangıcı, bir canlı ise doğanın eşsiz bir parçasıdır.
          </p>
          <p>
            Geleneksel tarımı desteklemek için <span className="italic text-brand-leaf font-medium">atalık tohumları</span> korurken, aynı zamanda egzotik canlıların büyüleyici dünyasını sizlerle paylaşıyoruz. Sunduğumuz her tohum bir miras, her canlı ise doğanın bize sunduğu bir dosttur.
          </p>
          <p>
            Profesyonel ekibimizle, hem bahçenizi yeşertmeniz hem de egzotik dostlarınıza en iyi bakımı sağlamanız için rehberlik ediyoruz. Tohumdan hasada, yumurtadan yetişkinliğe her adımda yanınızdayız.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-green/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="tel:05347636010" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-brand-green/5 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-brand-cream transition-all">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/60 group-hover:text-brand-leaf transition-colors">Bize Ulaşın</p>
              <p className="font-bold text-brand-green group-hover:text-brand-leaf transition-colors">0534 763 60 10</p>
            </div>
          </a>
          <button 
            onClick={onClose}
            className="px-10 py-4 bg-brand-green text-brand-cream rounded-xl font-bold hover:bg-brand-leaf transition-all shadow-md"
          >
            Kapat
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Footer = ({ onAboutOpen, onCategorySelect }: { onAboutOpen: () => void; onCategorySelect: (cat: Category | null) => void }) => {
  return (
    <footer id="contact" className="bg-brand-green text-brand-cream pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-full lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div 
                className="rounded-full overflow-hidden border-2 border-brand-cream/20 shadow-lg bg-white p-0"
                style={{ width: 'clamp(60px, 15vw, 100px)', height: 'auto', aspectRatio: '1/1' }}
              >
                <img 
                  src="https://lh3.googleusercontent.com/d/1qoAJaUUiyoZEI96jVBEvBwZXH_vRsE6L" 
                  alt="Green World Logo" 
                  className="w-full h-full object-cover scale-[1.35]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <span className="text-2xl md:text-3xl font-serif font-bold tracking-tight">Green World</span>
            </div>
            <p className="text-brand-cream/60 max-w-sm mb-10 leading-relaxed text-base">
              Atalık tohumlar ve egzotik canlılarla doğanın mucizelerini keşfedin. 
              Gelecek nesillere daha yeşil ve canlı bir dünya bırakmak için çalışıyoruz.
            </p>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-sun/80">Bizi Takip Edin</span>
              <a 
                href="https://instagram.com/greenworldofficiall" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-3 w-fit"
              >
                <div className="w-12 h-12 rounded-2xl border border-brand-cream/20 flex items-center justify-center transition-all group-hover:bg-brand-cream group-hover:text-brand-green group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <Instagram size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-wide">@greenworldofficiall</span>
                  <span className="text-[10px] text-brand-cream/40">Instagram'da Keşfet</span>
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-brand-sun">Hızlı Linkler</h4>
            <ul className="space-y-4 text-brand-cream/60 text-sm">
              <li><button onClick={() => { onCategorySelect(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-sun transition-colors">Anasayfa</button></li>
              <li><button onClick={() => { onCategorySelect("Böcekler"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-sun transition-colors">Böcekler</button></li>
              <li><button onClick={() => { onCategorySelect("Sebzeler"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-sun transition-colors">Sebze Tohumları</button></li>
              <li><button onClick={() => { onCategorySelect("Meyveler"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-sun transition-colors">Meyve Tohumları</button></li>
              <li><button onClick={onAboutOpen} className="hover:text-brand-sun transition-colors">Hakkımızda</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-brand-sun">İletişim</h4>
            <ul className="space-y-4 text-brand-cream/60 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-sun" />
                <a href="tel:05347636010" className="hover:text-brand-sun transition-colors">0534 763 60 10</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="text-brand-sun" />
                <a href="https://wa.me/905347636010" target="_blank" rel="noopener noreferrer" className="hover:text-brand-sun transition-colors">WhatsApp Hattı</a>
              </li>
              <li className="flex items-start gap-3">
                <Info size={16} className="text-brand-sun shrink-0 mt-1" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-brand-cream/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-medium uppercase tracking-widest text-brand-cream/30">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© 2026 Green World.</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-brand-cream/20" />
            <p className="text-brand-sun font-bold">MERCAN İZGİ</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-sun transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-brand-sun transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const productsSectionRef = useRef<HTMLElement>(null);

  const vegetableTypes: SubCategoryType[] = [
    "Domates", "Biber", "Salatalık", "Patlıcan", "Kabak", "Mısır", 
    "Ispanak", "Kıvırcık", "Renkli Pazı", "Tatsoi", "Mizuna", "Pak Choi",
    "Göbek"
  ];

  const fruitTypes: SubCategoryType[] = [
    "Karpuz"
  ];

  const subCategoryOrder: Record<string, number> = {
    "Domates": 1,
    "Biber": 2,
    "Salatalık": 3,
    "Patlıcan": 4,
    "Kabak": 5,
    "Mısır": 6,
    "Ispanak": 7,
    "Kıvırcık": 8,
    "Renkli Pazı": 9,
    "Tatsoi": 10,
    "Mizuna": 11,
    "Pak Choi": 12,
    "Karpuz": 13,
    "Göbek": 14
  };

  const filteredProducts = useMemo(() => {
    const filtered = PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory 
        ? p.category === selectedCategory 
        : true;
      const matchesSubCategory = selectedSubCategory 
        ? p.subCategory === selectedSubCategory 
        : true;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubCategory && matchesSearch;
    });

    // Sort products: Sebzeler first, then Meyveler, then Böcekler (if in 'Hepsi' view).
    return [...filtered].sort((a, b) => {
      // Category priority: Sebzeler (0) < Meyveler (1) < Böcekler (2)
      const categoryPriority = (cat: Category) => {
        if (cat === "Sebzeler") return 0;
        if (cat === "Meyveler") return 1;
        return 2;
      };

      if (a.category !== b.category) {
        return categoryPriority(a.category) - categoryPriority(b.category);
      }

      // Within Sebzeler, use subCategoryOrder
      if (a.category === "Sebzeler") {
        const orderA = a.subCategory ? (subCategoryOrder[a.subCategory] || 99) : 99;
        const orderB = b.subCategory ? (subCategoryOrder[b.subCategory] || 99) : 99;
        
        if (orderA !== orderB) {
          return orderA - orderB;
        }
      }

      // Default alphabetical by name
      return a.name.localeCompare(b.name);
    });
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  const handleCategoryChange = (cat: Category | null) => {
    setSelectedCategory(cat);
    setSelectedSubCategory(null);
    setSearchQuery("");
  };

  const handleDiscoverClick = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onCategorySelect={handleCategoryChange} 
        onAboutOpen={() => setIsAboutOpen(true)}
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
      />
      
      <main className="flex-grow">
        {!selectedCategory && (
          <>
            <Hero 
              onAboutOpen={() => setIsAboutOpen(true)} 
              onDiscoverClick={handleDiscoverClick}
            />
            <Features />
            <InsectSpotlight onCategorySelect={setSelectedCategory} onDiscoverClick={handleDiscoverClick} />
          </>
        )}

        {selectedCategory === "Böcekler" && (
          <>
            <InsectHero />
          </>
        )}
        
        <section 
          ref={productsSectionRef}
          className={cn("py-20", !selectedCategory && "bg-white")}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-green mb-4">
                  {selectedSubCategory || selectedCategory || "Tüm Ürünlerimiz"}
                </h2>
                <p className="text-brand-earth max-w-xl">
                  {selectedCategory === "Böcekler" 
                    ? "Birçok ülkeden farklı türler ile en iyisini sunuyoruz." 
                    : "Özenle seçilmiş, yüksek çimlenme oranına sahip tohumlarımızla kendi bahçenizi kurun."}
                </p>
              </div>
              
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-earth" size={20} />
                <input 
                  type="text" 
                  placeholder={selectedCategory === "Böcekler" ? "Böcek ara" : "Tohum ara"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-brand-cream rounded-2xl border border-brand-green/10 focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 mb-12">
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                <button 
                  onClick={() => handleCategoryChange(null)}
                  className={cn(
                    "px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap",
                    !selectedCategory ? "bg-brand-green text-brand-cream" : "bg-brand-cream text-brand-green hover:bg-brand-green/5"
                  )}
                >
                  Hepsi
                </button>
                <button 
                  onClick={() => handleCategoryChange("Sebzeler")}
                  className={cn(
                    "px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap",
                    selectedCategory === "Sebzeler" ? "bg-brand-green text-brand-cream" : "bg-brand-cream text-brand-green hover:bg-brand-green/5"
                  )}
                >
                  Sebzeler
                </button>
                <button 
                  onClick={() => handleCategoryChange("Meyveler")}
                  className={cn(
                    "px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap",
                    selectedCategory === "Meyveler" ? "bg-brand-green text-brand-cream" : "bg-brand-cream text-brand-green hover:bg-brand-green/5"
                  )}
                >
                  Meyveler
                </button>
              </div>

              {selectedCategory === "Sebzeler" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 overflow-x-auto pb-2 no-scrollbar border-t border-brand-green/5 pt-6"
                >
                  <button 
                    onClick={() => setSelectedSubCategory(null)}
                    className={cn(
                      "px-4 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border",
                      !selectedSubCategory ? "bg-brand-leaf text-brand-cream border-brand-leaf" : "bg-white text-brand-green border-brand-green/10 hover:border-brand-leaf"
                    )}
                  >
                    Tüm Sebzeler
                  </button>
                  {vegetableTypes.map((type) => (
                    <button 
                      key={type}
                      onClick={() => setSelectedSubCategory(type)}
                      className={cn(
                        "px-4 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border",
                        selectedSubCategory === type ? "bg-brand-leaf text-brand-cream border-brand-leaf" : "bg-white text-brand-green border-brand-green/10 hover:border-brand-leaf"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </motion.div>
              )}

              {selectedCategory === "Meyveler" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 overflow-x-auto pb-2 no-scrollbar border-t border-brand-green/5 pt-6"
                >
                  <button 
                    onClick={() => setSelectedSubCategory(null)}
                    className={cn(
                      "px-4 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border",
                      !selectedSubCategory ? "bg-brand-leaf text-brand-cream border-brand-leaf" : "bg-white text-brand-green border-brand-green/10 hover:border-brand-leaf"
                    )}
                  >
                    Tüm Meyveler
                  </button>
                  {fruitTypes.map((type) => (
                    <button 
                      key={type}
                      onClick={() => setSelectedSubCategory(type)}
                      className={cn(
                        "px-4 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border",
                        selectedSubCategory === type ? "bg-brand-leaf text-brand-cream border-brand-leaf" : "bg-white text-brand-green border-brand-green/10 hover:border-brand-leaf"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard 
                      product={product} 
                      onInfoClick={() => setSelectedProduct(product)} 
                      onAddToCart={() => addToCart(product)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-brand-earth text-lg italic">Aradığınız kriterlere uygun tohum bulunamadı.</p>
              </div>
            )}
          </div>
        </section>

        {!selectedCategory && (
          <section className="py-24 bg-brand-green/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-green mb-12 leading-tight">
                  Neden <br /><span className="text-brand-leaf italic">Green World?</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-leaf shadow-md shrink-0">
                      <Leaf size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-brand-green mb-2">Geleneksel Tohumlar</h4>
                      <p className="text-brand-earth text-sm">Hibrit olmayan, nesilden nesile aktarılan gerçek tohumlar sunuyoruz.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-leaf shadow-md shrink-0">
                      <ShoppingBag size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-brand-green mb-2">Yüksek Çimlenme Oranı</h4>
                      <p className="text-brand-earth text-sm">Tüm tohumlarımız tazelik ve çimlenme testlerinden geçirilerek paketlenir.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-leaf shadow-md shrink-0">
                      <Phone size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-brand-green mb-2">Uzman Desteği</h4>
                      <p className="text-brand-earth text-sm">Ekimden hasada kadar her adımda telefon desteğimizle yanınızdayız.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer onAboutOpen={() => setIsAboutOpen(true)} onCategorySelect={handleCategoryChange} />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={() => addToCart(selectedProduct)}
          />
        )}
        {isAboutOpen && (
          <AboutModal onClose={() => setIsAboutOpen(false)} />
        )}
        {isCartOpen && (
          <CartModal 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
