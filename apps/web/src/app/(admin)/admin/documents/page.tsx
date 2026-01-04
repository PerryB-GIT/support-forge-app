import { prisma } from "@support-forge/database";
import Link from "next/link";
import { DocumentActions } from "@/components/admin/DocumentActions";

export default async function AdminDocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) {
      return (
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10.92,12.31C10.68,11.54 10.15,9.08 11.55,9.04C12.95,9 12.03,12.16 12.03,12.16C12.42,13.65 14.05,14.72 14.05,14.72C14.55,14.57 17.4,14.24 17,15.72C16.57,17.2 13.5,15.81 13.5,15.81C11.55,15.95 10.09,16.47 10.09,16.47C8.96,18.58 7.64,19.5 7.1,18.61C6.43,17.5 9.23,16.07 9.23,16.07C10.68,13.72 10.9,12.35 10.92,12.31Z" />
        </svg>
      );
    }
    if (type.includes("image")) {
      return (
        <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
        </svg>
      );
    }
    if (type.includes("word") || type.includes("document")) {
      return (
        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M15.2,20H13.8L12,13.2L10.2,20H8.8L6.6,11H8.1L9.5,17.8L11.3,11H12.6L14.4,17.8L15.8,11H17.3L15.2,20M13,9V3.5L18.5,9H13Z" />
        </svg>
      );
    }
    if (type.includes("spreadsheet") || type.includes("excel")) {
      return (
        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10,13H7V11H10V13M14,13H11V11H14V13M10,16H7V14H10V16M14,16H11V14H14V16M10,19H7V17H10V19M14,19H11V17H14V19Z" />
        </svg>
      );
    }
    return (
      <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    );
  };

  const totalSize = documents.reduce((acc, doc) => acc + (doc.size || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Documents
          </h1>
          <p className="text-text-secondary mt-1">
            Upload and manage client documents
          </p>
        </div>
        <Link
          href="/admin/documents/upload"
          className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Document
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Total Documents</p>
          <p className="text-2xl font-bold mt-1">{documents.length}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Total Size</p>
          <p className="text-2xl font-bold mt-1 text-accent">{formatFileSize(totalSize)}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Clients with Documents</p>
          <p className="text-2xl font-bold mt-1 text-green-500">
            {new Set(documents.map((d) => d.clientId)).size}
          </p>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        {documents.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            No documents uploaded yet.{" "}
            <Link href="/admin/documents/upload" className="text-accent hover:underline">
              Upload your first document
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 hover:bg-elevated/50 flex items-center gap-4"
              >
                <div className="flex-shrink-0">
                  {getFileIcon(doc.type || "file")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{doc.name}</p>
                  <div className="flex items-center gap-3 text-sm text-text-muted mt-1">
                    <span>{formatFileSize(doc.size || 0)}</span>
                    <span>•</span>
                    <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-medium">
                      {doc.client.name.charAt(0)}
                    </div>
                    <span className="text-sm text-text-secondary">{doc.client.name}</span>
                  </div>
                </div>
                <DocumentActions
                  documentId={doc.id}
                  documentName={doc.name}
                  documentUrl={doc.url}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
