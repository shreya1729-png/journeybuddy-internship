# GCP Cloud Storage Architecture

## 1. Overview

This module designs a Google Cloud Storage architecture for the
JourneyBuddy application.

The architecture separates cloud assets into public and private
storage areas and uses IAM permissions to control access.

The design focuses on:

* Cloud Storage bucket organization
* Public asset access
* Private authenticated file access
* IAM role-based access control
* Separation of public and private data

---

## 2. Cloud Storage Architecture

The proposed storage architecture contains two buckets.

### Public Assets Bucket

**Bucket name:** `journeybuddy-public-assets`

**Purpose:**
Stores files that are intended to be publicly accessible.

**Examples:**

* Website images
* Public documents
* Application assets
* Public media

**Access model:**

* Public users can read public objects.
* Only authorized administrators can upload or modify objects.

### Private Files Bucket

**Bucket name:** `journeybuddy-private-files`

**Purpose:**
Stores files that contain private or authenticated-user data.

**Examples:**

* User documents
* Private reports
* Uploaded files
* Internal application data

**Access model:**

* Objects are not publicly accessible.
* Authenticated application users access files through authorized application services.
* Administrators can manage the bucket.

---

## 3. Architecture Diagram

```text
                    JourneyBuddy Application
                              |
                              |
                       Authentication
                              |
                     Firebase Authentication
                              |
                 +------------+------------+
                 |                         |
                 |                         |
          Public Assets              Private Files
                 |                         |
                 v                         v
      +----------------------+   +----------------------+
      | GCS Public Bucket    |   | GCS Private Bucket   |
      |                      |   |                      |
      | public-assets        |   | private-files        |
      +----------------------+   +----------------------+
                 |                         |
                 v                         v
          Public Read Access       Authenticated Access
                                    + Admin Access
```

---

## 4. Access Control Model

The architecture uses role-based access control through Google Cloud IAM.

### Public Assets

Public users require read-only access to objects intended for public consumption.

Administrative users require permissions to upload, update, and manage public assets.

### Private Files

Private files must not be publicly accessible.

Authenticated application access is controlled through authorized application identities.

Administrative users can manage private files when required.

---

## 5. IAM Permission Matrix

| Identity / Role                | Public Assets          | Private Files                 |
| ------------------------------ | ---------------------- | ----------------------------- |
| Public User                    | Read public objects    | No access                     |
| Authenticated Application User | Read public objects    | Authorized application access |
| Application Service Account    | Read/Write as required | Read/Write as required        |
| Storage Administrator          | Full management        | Full management               |

---

## 6. Security Principles

The architecture follows these security principles:

1. Public and private assets are separated into different buckets.
2. Private files are never made publicly accessible.
3. Users receive only the permissions required for their task.
4. Administrative permissions are restricted to authorized identities.
5. Application access to private files is performed through authorized application identities.
6. IAM roles are used instead of giving unrestricted access.

---

## 7. Proposed Bucket Layout

```text
Google Cloud Storage
│
├── journeybuddy-public-assets
│   ├── images/
│   ├── documents/
│   └── media/
│
└── journeybuddy-private-files
    ├── user-documents/
    ├── reports/
    └── uploads/
```

---

## 8. Design Decisions

### Why separate public and private buckets?

Separating the storage locations makes access control easier to understand and reduces the risk of accidentally exposing private files.

### Why use IAM?

IAM provides role-based access control so that different identities can receive different levels of access.

### Why keep private files non-public?

Private files may contain authenticated-user or internal application data and therefore should only be accessible to authorized identities.

---

## 9. Conclusion

This architecture provides a simple and secure Google Cloud Storage design for JourneyBuddy.

Public assets and private files are separated into different buckets, while IAM permissions define who can read, upload, and manage the stored resources.

The design satisfies the GCP module requirement for cloud asset storage architecture and IAM permission modeling.
