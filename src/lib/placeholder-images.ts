export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: ImagePlaceholder[] = [
    {
      "id": "home-hero",
      "description": "A friendly doctor assisting a patient using a tablet.",
      "imageUrl": "https://picsum.photos/seed/homehero/300/200",
      "imageHint": "doctor patient"
    },
    {
      "id": "hospital-illustration",
      "description": "An illustration of a hospital building.",
      "imageUrl": "https://picsum.photos/seed/hospital/300/200",
      "imageHint": "hospital building"
    },
    {
      "id": "user-avatar",
      "description": "A placeholder avatar for a user profile.",
      "imageUrl": "https://picsum.photos/seed/useravatar/100/100",
      "imageHint": "person avatar"
    }
  ];
