import type { ComponentType } from "react";
import type { ClientData, TemplateName } from "@/lib/clients";
import { AuroraTemplate } from "./aurora";

/**
 * Template registry — maps a template name to its renderer.
 * Add a new template here, then reference it from a client in lib/clients.ts.
 */
export const TEMPLATES: Record<TemplateName, ComponentType<{ data: ClientData }>> = {
  aurora: AuroraTemplate,
};
