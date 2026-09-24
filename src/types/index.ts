export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: "zap" | "shield" | "palette" | "rocket" | "code" | "layers";
}

export * from "./shopify";

