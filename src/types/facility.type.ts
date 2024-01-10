export interface IFacility {
    id: number;
    name?: string;
    group_id?: IGroupFacility;
    youtube_channel_id?: string;
    instagram_token_id?: string;
    image_thumnail_url?: string;
    folder_id?: string;
    is_active?: boolean;
    start_date?: string;
    end_date?: string;
    order?: number
}

export enum IGroupFacility {
    ZOO = 1,
    AQUARIUM,
    JCOM,
    PET,
    WORLD_ANIMAL
}