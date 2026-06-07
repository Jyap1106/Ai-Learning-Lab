export type VamoShareScope = "private" | "read_only" | "collaborator";

export interface VamoBackendTripPayload {
  tripId: string;
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  days: unknown[];
  versionHistory: unknown[];
  updatedAt: string;
}

export interface VamoShareSettings {
  scope: VamoShareScope;
  allowComments: boolean;
  allowSuggestions: boolean;
  expiresAt?: string;
}

export interface VamoFutureBackendPlan {
  saveTripEndpoint: "/api/trips/:tripId";
  shareTripEndpoint: "/api/trips/:tripId/share";
  restoreVersionEndpoint: "/api/trips/:tripId/versions/:versionId/restore";
  assistantEndpoint: "/api/assistant";
}

export const VAMO_FUTURE_BACKEND_PLAN: VamoFutureBackendPlan = {
  saveTripEndpoint: "/api/trips/:tripId",
  shareTripEndpoint: "/api/trips/:tripId/share",
  restoreVersionEndpoint: "/api/trips/:tripId/versions/:versionId/restore",
  assistantEndpoint: "/api/assistant",
};

export function createBackendReadyTripPayload(
  trip: Omit<VamoBackendTripPayload, "updatedAt">,
): VamoBackendTripPayload {
  return {
    ...trip,
    updatedAt: new Date().toISOString(),
  };
}
