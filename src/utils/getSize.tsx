export class GetSize {
  static get isMobile() {
    return typeof window !== "undefined" && window.innerWidth < 768;
  }
}