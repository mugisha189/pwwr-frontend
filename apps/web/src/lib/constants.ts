import { ResourceType } from '@/types/resource';
import { FileText } from 'lucide-react';

type AcceptedFormats = {
  [key in ResourceType]: {
    value: string[];
    description: string;
    maxSize: number;
  };
};

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const MAX_FILE_SIZE_VIDEO = 50 * 1024 * 1024; // 40MB
export const MAX_FILE_SIZE_AUDIO = 30 * 1024 * 1024; // 30MB
export const MAX_FILE_SIZE_DOCUMENT = 30 * 1024 * 1024; // 30MB

export const acceptedFormats: AcceptedFormats = {
  IMAGE: {
    value: ['image/*'],
    description: 'Image files (jpg, png, gif, etc.)',
    maxSize: MAX_FILE_SIZE,
  },
  VIDEO: {
    value: ['video/*'],
    description: 'Video files (mp4, mov, avi, etc.)',
    maxSize: MAX_FILE_SIZE_VIDEO,
  },
  AUDIO: {
    value: ['audio/*'],
    description: 'Audio files (mp3, wav, etc.)',
    maxSize: MAX_FILE_SIZE_AUDIO,
  },
  DOCUMENT: {
    value: [
      // Word documents
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // .doc
      // Excel files
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      // PowerPoint files
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
      'application/vnd.ms-powerpoint', // .ppt
      // PDF
      'application/pdf',
      // OpenDocument formats
      'application/vnd.oasis.opendocument.text', // .odt
      'application/vnd.oasis.opendocument.spreadsheet', // .ods
      'application/vnd.oasis.opendocument.presentation', // .odp
      // Rich Text Format
      'application/rtf', // .rtf
      // Text files
      'text/plain', // .txt
      'text/csv', // .csv
    ],
    description: 'Document files (pdf, doc, docx, xlsx, ppt, etc.)',
    maxSize: MAX_FILE_SIZE_DOCUMENT,
  },
  OTHER: {
    value: ['*'],
    description: 'Other files (any file type)',
    maxSize: MAX_FILE_SIZE,
  },
};

// export const FileIcon = {
//   'text/plain': FileText,
