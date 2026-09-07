# Google Cloud Platform (GCP)

## 1. Objective

This module focuses on designing a Google Cloud Platform architecture for secure cloud asset storage.

The design separates public assets from private authenticated files and defines IAM permissions for controlled access.

---

## 2. HR Task

### Exercise

Architect cloud asset storage with access controls.

The architecture must:

* Design a storage bucket layout.
* Distinguish public assets from private files.
* Define IAM role bindings.
* Control access according to user and application requirements.

### GitHub Deliverable

The module requires:

* Cloud resource architecture diagram.
* IAM permission matrix.

---

## 3. Proposed Cloud Storage Architecture

The JourneyBuddy application uses two logical Cloud Storage buckets.

### Public Assets

**Bucket:** `journeybuddy-public-assets`

Used for publicly available application assets such as:

* Images
* Public documents
* Media
* Static application assets

Public users have read-only access to these resources.

### Private Files

**Bucket:** `journeybuddy-private-files`

Used for protected application resources such as:

* User documents
* Private reports
* Uploaded files
* Internal application data

These resources are not publicly accessible.

---

## 4. IAM Access Model

IAM is used to control access to the storage resources.

| Identity                       | Public Assets          | Private Files                 |
| ------------------------------ | ---------------------- | ----------------------------- |
| Public User                    | Read objects           | No access                     |
| Authenticated Application User | Read objects           | Authorized application access |
| Application Service Account    | Read/Write as required | Read/Write as required        |
| Storage Administrator          | Full management        | Full management               |

The design follows the principle of least privilege.

---

## 5. Security Design

The architecture applies the following security principles:

1. Public and private resources are separated.
2. Private files are not publicly accessible.
3. Public users receive only read access to public assets.
4. Application identities receive permissions required for application operations.
5. Administrative permissions are restricted to authorized users.
6. IAM is used for role-based access control.

---

## 6. Architecture Documentation

The complete cloud storage architecture and resource flow are documented in:

`ARCHITECTURE.md`

The IAM permission model is documented in:

`IAM-MATRIX.md`

---

## 7. Project Structure

```text
09-gcp/
│
├── ARCHITECTURE.md
├── IAM-MATRIX.md
└── README.md
```

---

## 8. Technologies

* Google Cloud Platform
* Google Cloud Storage
* Google Cloud IAM

---

## 9. Implementation Note

This module is completed as an architecture and design exercise.

The HR task requires the cloud resource architecture and IAM permission model to be documented and pushed to GitHub.

A live Cloud Storage resource was not created because billing was disabled for the Google Cloud project.

The design therefore focuses on the required architecture, access-control model, and IAM permission matrix.

---

## 10. Task Completion

### Completed

* [x] Designed cloud storage bucket architecture.
* [x] Separated public and private assets.
* [x] Designed IAM access model.
* [x] Created cloud architecture diagram.
* [x] Created IAM permission matrix.
* [x] Documented security principles.
* [x] Created module README.

---

## 11. Reference Documentation

Google Cloud documentation:

https://cloud.google.com/docs

---

## 12. Conclusion

The GCP module demonstrates a secure cloud storage architecture using separate public and private storage resources with role-based IAM access control.

The architecture and IAM permission matrix provide a clear model for controlling access to JourneyBuddy cloud assets.
