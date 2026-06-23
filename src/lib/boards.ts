export type Tone = "green" | "navy" | "slate";

export type Product = {
  slug: string;
  name: string;
  mpn: string;
  manufacturer: string;
  tagline: string;
  category: "Dev Board" | "PCB Kit" | "Module" | "Sensor";
  price: number;
  mrp?: number;
  ships: string;
  badge?: string;
  seed: number;
  tone: Tone;
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: "nano-edge-rp2040",
    name: "NanoEdge RP2040",
    mpn: "NF-EDGE-2040",
    manufacturer: "NanoFab",
    tagline: "Dual-core microcontroller dev board with USB-C and castellated edges.",
    category: "Dev Board",
    price: 434,
    mrp: 549,
    ships: "Ships in 1 day",
    badge: "Best seller",
    seed: 7,
    tone: "green",
    specs: [
      { label: "MCU", value: "RP2040 @ 133MHz" },
      { label: "Flash", value: "4 MB" },
      { label: "GPIO", value: "26 pins" },
      { label: "Layers", value: "4-layer" },
    ],
  },
  {
    slug: "nano-power-buck",
    name: "NanoPower Buck 5A",
    mpn: "NF-PWR-B5A",
    manufacturer: "NanoFab",
    tagline: "Wide-input synchronous buck regulator module for rugged designs.",
    category: "Module",
    price: 289,
    ships: "Ships in 1 day",
    seed: 22,
    tone: "navy",
    specs: [
      { label: "Vin", value: "6–40 V" },
      { label: "Iout", value: "5 A" },
      { label: "Efficiency", value: "96%" },
      { label: "Layers", value: "2-layer" },
    ],
  },
  {
    slug: "nano-sense-9dof",
    name: "NanoSense 9-DOF",
    mpn: "NF-IMU-9D",
    manufacturer: "NanoFab",
    tagline: "9-axis IMU breakout with on-board sensor fusion firmware.",
    category: "Sensor",
    price: 376,
    mrp: 420,
    ships: "Ships in 2 days",
    badge: "New",
    seed: 41,
    tone: "slate",
    specs: [
      { label: "Sensors", value: "Accel + Gyro + Mag" },
      { label: "Interface", value: "I²C / SPI" },
      { label: "Rate", value: "1 kHz" },
      { label: "Layers", value: "4-layer" },
    ],
  },
  {
    slug: "nano-proto-kit",
    name: "NanoProto Kit (5×)",
    mpn: "NF-KIT-2L5",
    manufacturer: "NanoFab",
    tagline: "Five blank 2-layer prototype boards — HASL finish, ready to populate.",
    category: "PCB Kit",
    price: 199,
    ships: "Ships in 1 day",
    badge: "Make in India",
    seed: 13,
    tone: "green",
    specs: [
      { label: "Quantity", value: "5 boards" },
      { label: "Size", value: "100 × 100 mm" },
      { label: "Finish", value: "Lead-free HASL" },
      { label: "Layers", value: "2-layer" },
    ],
  },
  {
    slug: "nano-can-fd",
    name: "NanoCAN FD",
    mpn: "NF-CAN-FD1",
    manufacturer: "NanoFab",
    tagline: "Isolated CAN-FD transceiver module for automotive & industrial buses.",
    category: "Module",
    price: 312,
    ships: "Ships in 2 days",
    seed: 55,
    tone: "navy",
    specs: [
      { label: "Bus", value: "CAN-FD 5 Mbps" },
      { label: "Isolation", value: "5 kV" },
      { label: "Protection", value: "±58 V" },
      { label: "Layers", value: "4-layer" },
    ],
  },
  {
    slug: "nano-rf-lora",
    name: "NanoRF LoRa 868",
    mpn: "NF-RF-868",
    manufacturer: "NanoFab",
    tagline: "Long-range sub-GHz radio module with U.FL and PCB antenna options.",
    category: "Module",
    price: 398,
    mrp: 460,
    ships: "Ships in 2 days",
    badge: "Low stock",
    seed: 31,
    tone: "slate",
    specs: [
      { label: "Band", value: "865–868 MHz" },
      { label: "Range", value: "Up to 10 km" },
      { label: "Tx Power", value: "+22 dBm" },
      { label: "Layers", value: "4-layer" },
    ],
  },
  {
    slug: "nano-relay-quad",
    name: "NanoRelay Quad",
    mpn: "NF-RLY-Q4",
    manufacturer: "NanoFab",
    tagline: "Four-channel opto-isolated relay board for home & factory automation.",
    category: "Module",
    price: 268,
    ships: "Ships in 1 day",
    seed: 18,
    tone: "green",
    specs: [
      { label: "Channels", value: "4" },
      { label: "Rating", value: "10 A @ 250 V" },
      { label: "Control", value: "3.3 / 5 V logic" },
      { label: "Layers", value: "2-layer" },
    ],
  },
  {
    slug: "nano-esp32-core",
    name: "NanoCore ESP32-S3",
    mpn: "NF-CORE-S3",
    manufacturer: "NanoFab",
    tagline: "Wi-Fi + BLE dev board with PSRAM, USB-C and Qwiic connector.",
    category: "Dev Board",
    price: 412,
    ships: "Ships in 1 day",
    badge: "Best seller",
    seed: 64,
    tone: "navy",
    specs: [
      { label: "SoC", value: "ESP32-S3" },
      { label: "RAM", value: "8 MB PSRAM" },
      { label: "Radio", value: "Wi-Fi + BLE 5" },
      { label: "Layers", value: "4-layer" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
