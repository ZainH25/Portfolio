/** Public URLs for project screenshots / app icons (files under `public/`). */
export const projectImageById: Record<string, string> = {
  "servicewrk-tech": "/images/portrait/ServiceWRKTechnician.png",
  pharmawrk: "/images/portrait/Pharmawrk.png",
  "servicewrk-agent": "/images/portrait/serviceWrkAgent.png",
  fetch: "/images/portrait/FetchIcon.png",
  "live-gps": "/images/portrait/LiveLocationTrackingRemoteActivationApp.jpeg",
  books: "/images/portrait/semnaticbook.png",
  "mock-interview": "/images/portrait/mockai.png",
  crop: "/images/portrait/croprecommendation.png",
  schedulebot: "/images/portrait/schedulebot.png",
};

export function getProjectImageSrc(projectId: string): string | undefined {
  return projectImageById[projectId];
}
