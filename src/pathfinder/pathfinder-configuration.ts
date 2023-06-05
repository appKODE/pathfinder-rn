import type { MockServerSettings, Scheme } from './types';

/**
 * Pathfinder config holder for pathfinder
 */
export class PathfinderConfiguration {
  private schemas = new Map<string, Scheme>();
  private defaultServer?: MockServerSettings;

  /**
   * create new instance of PathfinderConfiguration
   * @param server common default mock server options
   * @returns instance of PathfinderConfiguration
   */
  static create(server?: MockServerSettings) {
    return new PathfinderConfiguration(server);
  }

  private constructor(server?: MockServerSettings) {
    this.defaultServer = server;
  }

  /**
   * add new openApi scheme
   */
  addScheme(scheme: Scheme) {
    this.schemas.set(scheme.name, {
      server: this.defaultServer,
      ...scheme,
    });
    return this;
  }

  /**
   * get all schemas
   */
  getAll(): Scheme[] {
    return [...this.schemas.values()];
  }

  /**
   * mock server options by scheme name
   */
  getMockServer(specificationName: string) {
    return this.schemas.get(specificationName)?.server;
  }
}
