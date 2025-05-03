export interface SocialMediaPlatformAttributes {
  id?: string; // Optional because Sequelize auto-generates it
  platform_name: string;
  platform_icon_url: string;
  domain_name: string;
}

export interface SocialMediaPlatformCreationAttributes
  extends Omit<SocialMediaPlatformAttributes, "id"> {}
