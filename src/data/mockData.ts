export type ParcelStatus = 'verified' | 'proposed' | 'disputed' | 'pending';
export type RoRStatus = 'linked' | 'mismatch' | 'pending' | 'disputed';

export interface Parcel {
  id: string;
  ulpin: string;
  khasraNo: string;
  surveyNo: string;
  ownerName: string;
  ownerAadhaarMasked: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  area: number; // in bigha
  areaHectare: number;
  cropType: string;
  status: ParcelStatus;
  rorStatus: RoRStatus;
  mutationPending: boolean;
  registryLinked: boolean;
  rtkDelta: number; // cm
  rtkDeltaStatus: 'pass' | 'flag' | 'critical';
  rtkNote: string;
  gnssLat: number;
  gnssLon: number;
  elevation: number; // meters
  lastInspected: string;
  inspectorName: string;
  inspectorId: string;
  signatureOwner: boolean;
  signatureOfficer: boolean;
  aiSegmentApproved: boolean;
  treeCount: number;
  irrigationType: 'canal' | 'borewell' | 'rainfed' | 'tank';
  // SVG polygon points
  svgPoints: string;
  svgColor: string;
  cx: number; // centroid x for label
  cy: number; // centroid y
}

export const PARCELS: Parcel[] = [
  {
    id: 'P001', ulpin: 'MP-23-04-017-001-0112', khasraNo: '112/1', surveyNo: 'S-0112',
    ownerName: 'Ramesh Patel', ownerAadhaarMasked: 'XXXX-XXXX-4821',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 3.2, areaHectare: 1.28, cropType: 'Wheat', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 1.8, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 1.8 cm — Passed GCP tolerance', gnssLat: 23.0247, gnssLon: 77.0183, elevation: 481.2,
    lastInspected: '2026-09-24', inspectorName: 'Suresh Verma', inspectorId: 'REV-MP-2247',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 3,
    irrigationType: 'canal', svgPoints: '42,28 162,22 168,118 48,126', svgColor: '#10B981', cx: 105, cy: 72,
  },
  {
    id: 'P002', ulpin: 'MP-23-04-017-001-0113', khasraNo: '113/2', surveyNo: 'S-0113',
    ownerName: 'Sunita Devi', ownerAadhaarMasked: 'XXXX-XXXX-3304',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 2.5, areaHectare: 1.00, cropType: 'Soybean', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 2.1, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 2.1 cm — Passed GCP tolerance', gnssLat: 23.0251, gnssLon: 77.0201, elevation: 479.8,
    lastInspected: '2026-09-24', inspectorName: 'Suresh Verma', inspectorId: 'REV-MP-2247',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 0,
    irrigationType: 'borewell', svgPoints: '168,22 290,18 296,112 168,118', svgColor: '#10B981', cx: 232, cy: 65,
  },
  {
    id: 'P003', ulpin: 'MP-23-04-017-001-0114', khasraNo: '114/1', surveyNo: 'S-0114',
    ownerName: 'Mohan Singh Rajput', ownerAadhaarMasked: 'XXXX-XXXX-7791',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 4.1, areaHectare: 1.64, cropType: 'Chickpea', status: 'proposed', rorStatus: 'pending',
    mutationPending: true, registryLinked: false, rtkDelta: 8.3, rtkDeltaStatus: 'flag',
    rtkNote: 'Delta: 8.3 cm — Flagged, partial tree cover on eastern bund', gnssLat: 23.0255, gnssLon: 77.0218, elevation: 480.5,
    lastInspected: '2026-09-25', inspectorName: 'Amit Kumar', inspectorId: 'REV-MP-2251',
    signatureOwner: false, signatureOfficer: false, aiSegmentApproved: false, treeCount: 11,
    irrigationType: 'canal', svgPoints: '296,18 418,24 424,108 296,112', svgColor: '#F59E0B', cx: 360, cy: 65,
  },
  {
    id: 'P004', ulpin: 'MP-23-04-017-001-0115', khasraNo: '115/3', surveyNo: 'S-0115',
    ownerName: 'Lakshmi Bai Yadav', ownerAadhaarMasked: 'XXXX-XXXX-5512',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 3.8, areaHectare: 1.52, cropType: 'Mustard', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 2.4, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 2.4 cm — Passed GCP tolerance', gnssLat: 23.0258, gnssLon: 77.0238, elevation: 478.9,
    lastInspected: '2026-09-25', inspectorName: 'Priya Sharma', inspectorId: 'REV-MP-2259',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 2,
    irrigationType: 'rainfed', svgPoints: '424,24 548,20 554,118 424,108', svgColor: '#10B981', cx: 489, cy: 69,
  },
  {
    id: 'P005', ulpin: 'MP-23-04-017-001-0116', khasraNo: '116/4', surveyNo: 'S-0116',
    ownerName: 'Bhagwandas Meena', ownerAadhaarMasked: 'XXXX-XXXX-0093',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 2.1, areaHectare: 0.84, cropType: 'Soybean', status: 'disputed', rorStatus: 'disputed',
    mutationPending: true, registryLinked: false, rtkDelta: 18.5, rtkDeltaStatus: 'critical',
    rtkNote: 'Delta: 18.5 cm — CRITICAL under dense tree cover. Rover re-survey required.',
    gnssLat: 23.0261, gnssLon: 77.0257, elevation: 482.1,
    lastInspected: '2026-09-23', inspectorName: 'Amit Kumar', inspectorId: 'REV-MP-2251',
    signatureOwner: false, signatureOfficer: false, aiSegmentApproved: false, treeCount: 24,
    irrigationType: 'tank', svgPoints: '548,20 672,26 678,124 554,118', svgColor: '#EF4444', cx: 613, cy: 72,
  },
  // Row 2
  {
    id: 'P006', ulpin: 'MP-23-04-017-001-0121', khasraNo: '121/1', surveyNo: 'S-0121',
    ownerName: 'Kalawati Prajapati', ownerAadhaarMasked: 'XXXX-XXXX-8847',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 3.5, areaHectare: 1.40, cropType: 'Wheat', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 1.9, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 1.9 cm — Passed GCP tolerance', gnssLat: 23.0238, gnssLon: 77.0182, elevation: 480.7,
    lastInspected: '2026-09-24', inspectorName: 'Suresh Verma', inspectorId: 'REV-MP-2247',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 1,
    irrigationType: 'canal', svgPoints: '42,126 168,118 174,215 48,224', svgColor: '#10B981', cx: 108, cy: 171,
  },
  {
    id: 'P007', ulpin: 'MP-23-04-017-001-0122', khasraNo: '122/2', surveyNo: 'S-0122',
    ownerName: 'Narayan Tiwari', ownerAadhaarMasked: 'XXXX-XXXX-2218',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 2.9, areaHectare: 1.16, cropType: 'Gram', status: 'proposed', rorStatus: 'pending',
    mutationPending: false, registryLinked: false, rtkDelta: 5.7, rtkDeltaStatus: 'flag',
    rtkNote: 'Delta: 5.7 cm — Flagged. Pending U-Net boundary approval.',
    gnssLat: 23.0241, gnssLon: 77.0201, elevation: 479.2,
    lastInspected: '2026-09-26', inspectorName: 'Priya Sharma', inspectorId: 'REV-MP-2259',
    signatureOwner: true, signatureOfficer: false, aiSegmentApproved: false, treeCount: 5,
    irrigationType: 'borewell', svgPoints: '168,118 296,112 302,208 174,215', svgColor: '#F59E0B', cx: 235, cy: 164,
  },
  {
    id: 'P008', ulpin: 'MP-23-04-017-001-0123', khasraNo: '123/3', surveyNo: 'S-0123',
    ownerName: 'Devendra Chauhan', ownerAadhaarMasked: 'XXXX-XXXX-6639',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 5.3, areaHectare: 2.12, cropType: 'Soybean', status: 'disputed', rorStatus: 'disputed',
    mutationPending: true, registryLinked: false, rtkDelta: 22.1, rtkDeltaStatus: 'critical',
    rtkNote: 'Delta: 22.1 cm — CRITICAL. Boundary dispute filed. Court reference: SDM-2026/341.',
    gnssLat: 23.0244, gnssLon: 77.0220, elevation: 481.3,
    lastInspected: '2026-09-22', inspectorName: 'Suresh Verma', inspectorId: 'REV-MP-2247',
    signatureOwner: false, signatureOfficer: false, aiSegmentApproved: false, treeCount: 8,
    irrigationType: 'rainfed', svgPoints: '302,108 424,108 430,205 302,208', svgColor: '#EF4444', cx: 366, cy: 157,
  },
  {
    id: 'P009', ulpin: 'MP-23-04-017-001-0124', khasraNo: '124/1', surveyNo: 'S-0124',
    ownerName: 'Shanta Bai Lodhi', ownerAadhaarMasked: 'XXXX-XXXX-1183',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 3.1, areaHectare: 1.24, cropType: 'Mustard', status: 'proposed', rorStatus: 'pending',
    mutationPending: false, registryLinked: false, rtkDelta: 7.2, rtkDeltaStatus: 'flag',
    rtkNote: 'Delta: 7.2 cm — Flagged. AI boundary proposal pending officer review.',
    gnssLat: 23.0247, gnssLon: 77.0239, elevation: 479.9,
    lastInspected: '2026-09-26', inspectorName: 'Amit Kumar', inspectorId: 'REV-MP-2251',
    signatureOwner: false, signatureOfficer: false, aiSegmentApproved: false, treeCount: 14,
    irrigationType: 'canal', svgPoints: '424,108 554,118 560,214 430,205', svgColor: '#F59E0B', cx: 492, cy: 161,
  },
  {
    id: 'P010', ulpin: 'MP-23-04-017-001-0125', khasraNo: '125/2', surveyNo: 'S-0125',
    ownerName: 'Ranjit Dhakad', ownerAadhaarMasked: 'XXXX-XXXX-4490',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 4.4, areaHectare: 1.76, cropType: 'Wheat', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 2.0, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 2.0 cm — Passed GCP tolerance', gnssLat: 23.0251, gnssLon: 77.0258, elevation: 480.1,
    lastInspected: '2026-09-25', inspectorName: 'Priya Sharma', inspectorId: 'REV-MP-2259',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 0,
    irrigationType: 'borewell', svgPoints: '554,118 678,124 684,222 560,214', svgColor: '#10B981', cx: 619, cy: 170,
  },
  // Row 3
  {
    id: 'P011', ulpin: 'MP-23-04-017-001-0131', khasraNo: '131/3', surveyNo: 'S-0131',
    ownerName: 'Parvati Singh Kushwah', ownerAadhaarMasked: 'XXXX-XXXX-7723',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 2.8, areaHectare: 1.12, cropType: 'Soybean', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 1.6, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 1.6 cm — Passed GCP tolerance', gnssLat: 23.0231, gnssLon: 77.0183, elevation: 479.5,
    lastInspected: '2026-09-25', inspectorName: 'Suresh Verma', inspectorId: 'REV-MP-2247',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 2,
    irrigationType: 'canal', svgPoints: '42,224 174,215 180,312 48,320', svgColor: '#10B981', cx: 111, cy: 268,
  },
  {
    id: 'P012', ulpin: 'MP-23-04-017-001-0132', khasraNo: '132/4', surveyNo: 'S-0132',
    ownerName: 'Manoj Patel', ownerAadhaarMasked: 'XXXX-XXXX-8821',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 3.6, areaHectare: 1.44, cropType: 'Chickpea', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 2.3, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 2.3 cm — Passed GCP tolerance', gnssLat: 23.0235, gnssLon: 77.0200, elevation: 480.3,
    lastInspected: '2026-09-26', inspectorName: 'Priya Sharma', inspectorId: 'REV-MP-2259',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 0,
    irrigationType: 'borewell', svgPoints: '174,215 302,208 308,308 180,312', svgColor: '#10B981', cx: 241, cy: 261,
  },
  {
    id: 'P013', ulpin: 'MP-23-04-017-001-0133', khasraNo: '133/1', surveyNo: 'S-0133',
    ownerName: 'Gangabai Yadav', ownerAadhaarMasked: 'XXXX-XXXX-3357',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 4.0, areaHectare: 1.60, cropType: 'Gram', status: 'proposed', rorStatus: 'mismatch',
    mutationPending: true, registryLinked: false, rtkDelta: 11.4, rtkDeltaStatus: 'flag',
    rtkNote: 'Delta: 11.4 cm — Flagged. RoR area mismatch: 1.60 ha recorded vs 1.47 ha measured.',
    gnssLat: 23.0238, gnssLon: 77.0219, elevation: 481.0,
    lastInspected: '2026-09-23', inspectorName: 'Amit Kumar', inspectorId: 'REV-MP-2251',
    signatureOwner: true, signatureOfficer: false, aiSegmentApproved: false, treeCount: 6,
    irrigationType: 'tank', svgPoints: '302,208 430,205 436,305 308,308', svgColor: '#F59E0B', cx: 369, cy: 257,
  },
  {
    id: 'P014', ulpin: 'MP-23-04-017-001-0134', khasraNo: '134/2', surveyNo: 'S-0134',
    ownerName: 'Sitaram Gurjar', ownerAadhaarMasked: 'XXXX-XXXX-2290',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 5.1, areaHectare: 2.04, cropType: 'Wheat', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 2.7, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 2.7 cm — Passed GCP tolerance', gnssLat: 23.0242, gnssLon: 77.0238, elevation: 479.6,
    lastInspected: '2026-09-25', inspectorName: 'Suresh Verma', inspectorId: 'REV-MP-2247',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 4,
    irrigationType: 'canal', svgPoints: '430,205 560,214 566,312 436,305', svgColor: '#10B981', cx: 498, cy: 259,
  },
  {
    id: 'P015', ulpin: 'MP-23-04-017-001-0135', khasraNo: '135/3', surveyNo: 'S-0135',
    ownerName: 'Radha Bai Thakur', ownerAadhaarMasked: 'XXXX-XXXX-5584',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 3.3, areaHectare: 1.32, cropType: 'Mustard', status: 'pending', rorStatus: 'pending',
    mutationPending: true, registryLinked: false, rtkDelta: 4.8, rtkDeltaStatus: 'flag',
    rtkNote: 'Delta: 4.8 cm — Survey in progress. Awaiting Gram Sabha notice confirmation.',
    gnssLat: 23.0245, gnssLon: 77.0257, elevation: 480.8,
    lastInspected: '2026-09-27', inspectorName: 'Priya Sharma', inspectorId: 'REV-MP-2259',
    signatureOwner: false, signatureOfficer: false, aiSegmentApproved: false, treeCount: 3,
    irrigationType: 'rainfed', svgPoints: '560,214 684,222 690,318 566,312', svgColor: '#94A3B8', cx: 625, cy: 267,
  },
  // Row 4
  {
    id: 'P016', ulpin: 'MP-23-04-017-001-0141', khasraNo: '141/1', surveyNo: 'S-0141',
    ownerName: 'Tulsiram Baghel', ownerAadhaarMasked: 'XXXX-XXXX-9918',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 2.7, areaHectare: 1.08, cropType: 'Soybean', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 2.2, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 2.2 cm — Passed GCP tolerance', gnssLat: 23.0224, gnssLon: 77.0182, elevation: 479.1,
    lastInspected: '2026-09-26', inspectorName: 'Amit Kumar', inspectorId: 'REV-MP-2251',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 1,
    irrigationType: 'borewell', svgPoints: '42,320 180,312 186,410 48,418', svgColor: '#10B981', cx: 114, cy: 365,
  },
  {
    id: 'P017', ulpin: 'MP-23-04-017-001-0142', khasraNo: '142/2', surveyNo: 'S-0142',
    ownerName: 'Kamla Devi Nayak', ownerAadhaarMasked: 'XXXX-XXXX-4411',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 4.2, areaHectare: 1.68, cropType: 'Chickpea', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 1.7, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 1.7 cm — Passed GCP tolerance', gnssLat: 23.0228, gnssLon: 77.0200, elevation: 480.4,
    lastInspected: '2026-09-26', inspectorName: 'Suresh Verma', inspectorId: 'REV-MP-2247',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 0,
    irrigationType: 'canal', svgPoints: '180,312 308,308 314,406 186,410', svgColor: '#10B981', cx: 247, cy: 359,
  },
  {
    id: 'P018', ulpin: 'MP-23-04-017-001-0143', khasraNo: '143/3', surveyNo: 'S-0143',
    ownerName: 'Dinesh Vishwakarma', ownerAadhaarMasked: 'XXXX-XXXX-7762',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 3.9, areaHectare: 1.56, cropType: 'Gram', status: 'disputed', rorStatus: 'disputed',
    mutationPending: true, registryLinked: false, rtkDelta: 31.2, rtkDeltaStatus: 'critical',
    rtkNote: 'Delta: 31.2 cm — CRITICAL. Colonial vs BhuMap survey boundary conflict. Legal hold.',
    gnssLat: 23.0231, gnssLon: 77.0219, elevation: 481.6,
    lastInspected: '2026-09-21', inspectorName: 'Amit Kumar', inspectorId: 'REV-MP-2251',
    signatureOwner: false, signatureOfficer: false, aiSegmentApproved: false, treeCount: 19,
    irrigationType: 'tank', svgPoints: '308,308 436,305 442,404 314,406', svgColor: '#EF4444', cx: 375, cy: 356,
  },
  {
    id: 'P019', ulpin: 'MP-23-04-017-001-0144', khasraNo: '144/4', surveyNo: 'S-0144',
    ownerName: 'Rajendra Prajapati', ownerAadhaarMasked: 'XXXX-XXXX-3376',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 2.4, areaHectare: 0.96, cropType: 'Wheat', status: 'verified', rorStatus: 'linked',
    mutationPending: false, registryLinked: true, rtkDelta: 2.6, rtkDeltaStatus: 'pass',
    rtkNote: 'Delta: 2.6 cm — Passed GCP tolerance', gnssLat: 23.0234, gnssLon: 77.0239, elevation: 479.3,
    lastInspected: '2026-09-27', inspectorName: 'Priya Sharma', inspectorId: 'REV-MP-2259',
    signatureOwner: true, signatureOfficer: true, aiSegmentApproved: true, treeCount: 0,
    irrigationType: 'borewell', svgPoints: '436,305 566,312 572,410 442,404', svgColor: '#10B981', cx: 504, cy: 358,
  },
  {
    id: 'P020', ulpin: 'MP-23-04-017-001-0145', khasraNo: '145/1', surveyNo: 'S-0145',
    ownerName: 'Geeta Bai Rawat', ownerAadhaarMasked: 'XXXX-XXXX-6641',
    village: 'Rampur Khurd', tehsil: 'Ichhawar', district: 'Sehore', state: 'Madhya Pradesh',
    area: 3.0, areaHectare: 1.20, cropType: 'Mustard', status: 'proposed', rorStatus: 'pending',
    mutationPending: false, registryLinked: false, rtkDelta: 9.1, rtkDeltaStatus: 'flag',
    rtkNote: 'Delta: 9.1 cm — Flagged. Southern boundary encroachment suspected.',
    gnssLat: 23.0237, gnssLon: 77.0257, elevation: 480.0,
    lastInspected: '2026-09-26', inspectorName: 'Suresh Verma', inspectorId: 'REV-MP-2247',
    signatureOwner: true, signatureOfficer: false, aiSegmentApproved: false, treeCount: 7,
    irrigationType: 'rainfed', svgPoints: '566,312 690,318 696,416 572,410', svgColor: '#F59E0B', cx: 631, cy: 364,
  },
];

export const RTK_CONTROL_POINTS = [
  { id: 'GCP-01', x: 168, y: 65, gnssLat: 23.0251, gnssLon: 77.0201, accuracy: 0.018, status: 'locked' },
  { id: 'GCP-02', x: 424, y: 108, gnssLat: 23.0258, gnssLon: 77.0238, accuracy: 0.022, status: 'locked' },
  { id: 'GCP-03', x: 680, y: 170, gnssLat: 23.0252, gnssLon: 77.0263, accuracy: 0.019, status: 'active' },
  { id: 'GCP-04', x: 42, y: 270, gnssLat: 23.0239, gnssLon: 77.0182, accuracy: 0.025, status: 'locked' },
  { id: 'GCP-05', x: 366, y: 260, gnssLat: 23.0242, gnssLon: 77.0220, accuracy: 0.031, status: 'flagged' },
  { id: 'GCP-06', x: 680, y: 318, gnssLat: 23.0237, gnssLon: 77.0263, accuracy: 0.020, status: 'locked' },
  { id: 'GCP-07', x: 180, y: 408, gnssLat: 23.0228, gnssLon: 77.0200, accuracy: 0.017, status: 'locked' },
  { id: 'GCP-08', x: 566, y: 410, gnssLat: 23.0234, gnssLon: 77.0257, accuracy: 0.023, status: 'locked' },
];

export const DRONE_FLIGHT_PATH = [
  { x: 42, y: 28 }, { x: 678, y: 26 },
  { x: 680, y: 120 }, { x: 42, y: 122 },
  { x: 44, y: 216 }, { x: 682, y: 218 },
  { x: 684, y: 314 }, { x: 44, y: 316 },
  { x: 46, y: 412 }, { x: 692, y: 414 },
];

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  parcelId: string;
  khasraNo: string;
  officerId: string;
  officerName: string;
  details: string;
  hash: string;
  category: 'boundary' | 'approval' | 'sync' | 'dispute' | 'drone' | 'rover';
}

export const AUDIT_LOG: AuditEntry[] = [
  { id: 'AUD-2026-001', timestamp: '2026-09-27 09:14:32', action: 'AI Boundary Approved', parcelId: 'P001', khasraNo: '112/1', officerId: 'REV-MP-2247', officerName: 'Suresh Verma', details: 'U-Net segmentation boundary approved. Delta 1.8 cm within tolerance.', hash: 'a3f7c2e1b4d89012', category: 'approval' },
  { id: 'AUD-2026-002', timestamp: '2026-09-27 09:31:08', action: 'Rover Dispatch Requested', parcelId: 'P005', khasraNo: '116/4', officerId: 'REV-MP-2251', officerName: 'Amit Kumar', details: 'Rover re-survey requested. Critical delta 18.5 cm under tree cover.', hash: 'b8e3d17a5c90f234', category: 'rover' },
  { id: 'AUD-2026-003', timestamp: '2026-09-27 10:05:44', action: 'RoR API Sync', parcelId: 'P002', khasraNo: '113/2', officerId: 'REV-MP-2259', officerName: 'Priya Sharma', details: 'State Bhulekh API sync successful. ULPIN linked to RoR registry.', hash: 'c5f1a89b2d340e56', category: 'sync' },
  { id: 'AUD-2026-004', timestamp: '2026-09-27 10:42:17', action: 'Boundary Edit — Manual Override', parcelId: 'P008', khasraNo: '123/3', officerId: 'REV-MP-2247', officerName: 'Suresh Verma', details: 'NE corner vertex adjusted by 3.2 cm. Drone-rover mismatch resolved.', hash: 'd2b9e47c6f512a78', category: 'boundary' },
  { id: 'AUD-2026-005', timestamp: '2026-09-27 11:18:53', action: 'Dispute Flag Raised', parcelId: 'P018', khasraNo: '143/3', officerId: 'REV-MP-2251', officerName: 'Amit Kumar', details: 'Colonial chain survey vs BhuMap delta 31.2 cm. Legal hold placed. SDM notified.', hash: 'e9a3c71f8b234d90', category: 'dispute' },
  { id: 'AUD-2026-006', timestamp: '2026-09-27 11:55:22', action: 'Drone Sortie Completed', parcelId: 'ALL', khasraNo: 'N/A', officerId: 'REV-MP-2259', officerName: 'Priya Sharma', details: 'Sortie #4 completed. 47 parcels ortho-processed. DSM uploaded to PostGIS.', hash: 'f4e8b20a9c756e12', category: 'drone' },
  { id: 'AUD-2026-007', timestamp: '2026-09-27 14:22:09', action: 'Owner Digital Signature', parcelId: 'P007', khasraNo: '122/2', officerId: 'REV-MP-2259', officerName: 'Priya Sharma', details: 'Landowner Narayan Tiwari signed via Aadhaar-linked OTP on field tablet.', hash: '0a7b3c9e1d4f8256', category: 'approval' },
  { id: 'AUD-2026-008', timestamp: '2026-09-27 15:08:41', action: 'AI Boundary Approved', parcelId: 'P004', khasraNo: '115/3', officerId: 'REV-MP-2259', officerName: 'Priya Sharma', details: 'Mustard field bund boundary approved. 24 vertices confirmed.', hash: '1b8d4f2e7a903c67', category: 'approval' },
  { id: 'AUD-2026-009', timestamp: '2026-09-27 15:44:17', action: 'Offline Sync — Tablet #3', parcelId: 'P009,P013', khasraNo: '124/1,133/1', officerId: 'REV-MP-2251', officerName: 'Amit Kumar', details: '2 parcels synced from tablet after 4h offline. Queue cleared.', hash: '2c9e5a3f1b024d78', category: 'sync' },
  { id: 'AUD-2026-010', timestamp: '2026-09-27 16:30:58', action: 'ULPIN Generated', parcelId: 'P015', khasraNo: '135/3', officerId: 'REV-MP-2259', officerName: 'Priya Sharma', details: 'New ULPIN MP-23-04-017-001-0135 generated and linked to Bhulekh.', hash: '3d0f6b4e2c135a89', category: 'sync' },
];

export interface Rover {
  id: string;
  label: string;
  operator: string;
  status: 'active' | 'idle' | 'offline' | 'charging';
  battery: number;
  gnssLock: boolean;
  corsLink: 'CORS' | 'Base Station' | 'Standalone';
  satellites: number;
  accuracy: number; // cm RMS
  imuTilt: number; // degrees
  imuOk: boolean;
  tabletConnected: boolean;
  tabletBattery: number;
  lastFix: string;
  currentParcel: string | null;
  fixCount: number;
}

export const ROVERS: Rover[] = [
  {
    id: 'RTK-R01', label: 'Rover Alpha', operator: 'Ravi Malviya', status: 'active',
    battery: 78, gnssLock: true, corsLink: 'CORS', satellites: 24, accuracy: 1.8,
    imuTilt: 2.1, imuOk: true, tabletConnected: true, tabletBattery: 62,
    lastFix: '2026-09-27 16:38:44', currentParcel: 'P005', fixCount: 247,
  },
  {
    id: 'RTK-R02', label: 'Rover Bravo', operator: 'Sunil Dangi', status: 'active',
    battery: 54, gnssLock: true, corsLink: 'Base Station', satellites: 21, accuracy: 2.3,
    imuTilt: 3.7, imuOk: true, tabletConnected: true, tabletBattery: 81,
    lastFix: '2026-09-27 16:37:58', currentParcel: 'P008', fixCount: 183,
  },
  {
    id: 'RTK-R03', label: 'Rover Charlie', operator: 'Hemant Sahu', status: 'idle',
    battery: 91, gnssLock: false, corsLink: 'Standalone', satellites: 9, accuracy: 15.4,
    imuTilt: 0.2, imuOk: true, tabletConnected: false, tabletBattery: 0,
    lastFix: '2026-09-27 14:12:30', currentParcel: null, fixCount: 312,
  },
  {
    id: 'RTK-R04', label: 'Rover Delta', operator: '—', status: 'charging',
    battery: 23, gnssLock: false, corsLink: 'Standalone', satellites: 0, accuracy: 0,
    imuTilt: 0, imuOk: true, tabletConnected: false, tabletBattery: 11,
    lastFix: '2026-09-26 17:44:11', currentParcel: null, fixCount: 98,
  },
];

export interface Drone {
  id: string;
  label: string;
  status: 'flying' | 'landed' | 'charging' | 'maintenance';
  battery: number;
  altitude: number;
  rtkLock: boolean;
  gpsSats: number;
  camTriggers: number;
  flightTime: number; // minutes this session
  coveragePercent: number;
  pilot: string;
  currentSortie: number;
  totalSorties: number;
  windSpeed: number; // kmh
}

export const DRONES: Drone[] = [
  {
    id: 'UAV-Q01', label: 'BhuKopter Alpha', status: 'flying', battery: 61,
    altitude: 87, rtkLock: true, gpsSats: 18, camTriggers: 3842,
    flightTime: 22, coveragePercent: 74, pilot: 'Akhilesh Tripathi',
    currentSortie: 4, totalSorties: 6, windSpeed: 12,
  },
  {
    id: 'UAV-Q02', label: 'BhuKopter Bravo', status: 'charging', battery: 18,
    altitude: 0, rtkLock: false, gpsSats: 0, camTriggers: 6241,
    flightTime: 0, coveragePercent: 100, pilot: 'Neeraj Patel',
    currentSortie: 6, totalSorties: 6, windSpeed: 0,
  },
];

export interface FieldStageItem {
  id: string;
  label: string;
  done: boolean;
  critical?: boolean;
}

export interface FieldStage {
  stageNo: number;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
  items: FieldStageItem[];
}

export const FIELD_STAGES: FieldStage[] = [
  {
    stageNo: 1, name: 'Village Kick-Off', status: 'completed', progress: 100,
    items: [
      { id: 's1-1', label: 'Gram Sabha notice issued (14-day mandatory period)', done: true },
      { id: 's1-2', label: 'Patwari ground check — 20 parcels chalk/peg marked', done: true },
      { id: 's1-3', label: 'Village Geodata Sheet (VGS) prepared', done: true },
      { id: 's1-4', label: 'Sarpanch co-signature obtained on survey notice', done: true },
      { id: 's1-5', label: 'Local objection window closed (no objections filed)', done: true },
    ],
  },
  {
    stageNo: 2, name: 'Aerial Capture & Ground Truth', status: 'in-progress', progress: 74,
    items: [
      { id: 's2-1', label: 'GCP network established (8/8 GCPs placed & fixed)', done: true },
      { id: 's2-2', label: 'Drone sortie 1–3 completed (NW, NE, Central zones)', done: true },
      { id: 's2-3', label: 'Drone sortie 4 — in-flight (SE zone, 74% complete)', done: false },
      { id: 's2-4', label: 'Drone sortie 5–6 — pending (SW zone + complete overlap)', done: false },
      { id: 's2-5', label: 'RTK Rover walk: 14/20 disputed edge visits completed', done: false, critical: true },
      { id: 's2-6', label: 'Tree-cover parcels: 6/9 rover re-surveys done', done: false, critical: true },
    ],
  },
  {
    stageNo: 3, name: 'On-Site Tablet Verification', status: 'in-progress', progress: 55,
    items: [
      { id: 's3-1', label: 'P001 Ramesh Patel — Owner + Officer signed ✓', done: true },
      { id: 's3-2', label: 'P002 Sunita Devi — Owner + Officer signed ✓', done: true },
      { id: 's3-3', label: 'P004 Lakshmi Bai — Owner + Officer signed ✓', done: true },
      { id: 's3-4', label: 'P006 Kalawati Prajapati — Owner + Officer signed ✓', done: true },
      { id: 's3-5', label: 'P007 Narayan Tiwari — Owner signed, Officer pending', done: false, critical: true },
      { id: 's3-6', label: 'P005 Bhagwandas Meena — Disputed, pending legal clearance', done: false, critical: true },
      { id: 's3-7', label: 'P008 Devendra Chauhan — Under SDM review (SDM-2026/341)', done: false, critical: true },
    ],
  },
  {
    stageNo: 4, name: 'Offline-to-Online Sync', status: 'in-progress', progress: 68,
    items: [
      { id: 's4-1', label: 'Tablet #1 (Rover Alpha) — Last sync 4 min ago (P001, P002, P004)', done: true },
      { id: 's4-2', label: 'Tablet #2 (Rover Bravo) — Last sync 11 min ago (P008, P013)', done: true },
      { id: 's4-3', label: 'Tablet #3 — OFFLINE 2h 14m — 3 parcels queued (P005, P018, P020)', done: false, critical: true },
      { id: 's4-4', label: 'PostGIS district server — Sync healthy (15 parcels committed)', done: true },
      { id: 's4-5', label: 'State Bhulekh API — 11/15 ULPIN linkages confirmed', done: false },
    ],
  },
];

export const VILLAGE_STATS = {
  villageName: 'Rampur Khurd',
  tehsil: 'Ichhawar',
  district: 'Sehore',
  state: 'Madhya Pradesh',
  totalParcels: 20,
  verified: 11,
  proposed: 5,
  disputed: 3,
  pending: 1,
  progressPercent: 84,
  rtkAccuracy: 2.4,
  ulpinsGenerated: 17,
  ulpinsLinked: 11,
  activeFlags: 3,
  pilotsDeployed: 3,
  surveyDays: 3,
  droneSortiesCompleted: 3,
  totalPlannedSorties: 6,
  totalAreaHectare: 28.72,
  surveyedAreaHectare: 24.13,
};
