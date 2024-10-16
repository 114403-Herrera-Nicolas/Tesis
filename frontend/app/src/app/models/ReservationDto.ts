export interface ReservationDto {
    id: number,
    cabinId: number,
    cabinName: string,
    urlPhotoPreview: string,
    status: string,
    startDate: string,
    endDate: string,
    priceForNight: number,
    totalNights: number,
}
