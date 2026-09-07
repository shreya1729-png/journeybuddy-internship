# GCP IAM Permission Matrix

## 1. Purpose

This document defines the IAM access model for the JourneyBuddy Google Cloud Storage architecture.

The goal is to distinguish access between public assets and private authenticated files while following the principle of least privilege.

---

## 2. Storage Resources

The architecture contains two logical Cloud Storage buckets.

| Bucket                       | Purpose                               | Access Type |
| ---------------------------- | ------------------------------------- | ----------- |
| `journeybuddy-public-assets` | Website and publicly available assets | Public read |
| `journeybuddy-private-files` | User and internal application files   | Private     |

---

## 3. IAM Permission Matrix

| Identity                       | Public Assets          | Private Files                         |
| ------------------------------ | ---------------------- | ------------------------------------- |
| Public User                    | Read objects           | No access                             |
| Authenticated Application User | Read objects           | Access through authorized application |
| Application Service Account    | Read/Write as required | Read/Write as required                |
| Storage Administrator          | Full management        | Full management                       |

---

## 4. Access Rules

### Public User

**Public Assets:**

* Can read objects intended for public access.
* Cannot upload, modify, or delete objects.

**Private Files:**

* Has no direct access.

---

### Authenticated Application User

**Public Assets:**

* Can read publicly available assets.

**Private Files:**

* Access is provided through the authorized application.
* Direct public access is not permitted.

---

### Application Service Account

**Public Assets:**

* Can read or write objects when required by the application.

**Private Files:**

* Can read or write private objects according to the application's required operations.

The service account should receive only the permissions required by the application.

---

### Storage Administrator

**Public Assets:**

* Full administrative management.

**Private Files:**

* Full administrative management.

Administrative access should only be granted to authorized personnel.

---

## 5. Least Privilege Model

The architecture follows the principle of least privilege.

Each identity receives only the access necessary to perform its intended function.

For example:

* Public users receive read-only access to public assets.
* Public users receive no access to private files.
* Application identities receive only the permissions required by application operations.
* Administrators receive management permissions when required.

---

## 6. Public vs Private Access

### Public Assets

The public bucket is designed for resources that can safely be accessed by anyone.

Examples include:

* Website images
* Public documents
* Public media
* Static application assets

Only read access is exposed publicly.

### Private Files

The private bucket contains resources that should only be accessed by authorized identities.

Examples include:

* User documents
* Private reports
* Uploaded files
* Internal application data

No anonymous public access is allowed.

---

## 7. Security Considerations

The following controls are part of the design:

1. Separate public and private storage resources.
2. Do not expose private files to anonymous users.
3. Use IAM roles for controlled access.
4. Apply least-privilege permissions.
5. Restrict administrative permissions.
6. Use application identities for backend access.
7. Review permissions periodically.

---

## 8. Access Flow

```text
                         User
                          |
                          v
                JourneyBuddy Application
                          |
                          v
                Authentication Layer
                          |
              +-----------+-----------+
              |                       |
              v                       v
       Public Asset Request      Private File Request
              |                       |
              v                       v
      Public Assets Bucket      Private Files Bucket
              |                       |
              v                       v
          Read Access          Authorized Access Only
```

---

## 9. Conclusion

This IAM model separates public and private cloud storage while assigning different access levels to different identities.

The design prevents anonymous access to private files and follows the principle of least privilege.

This permission matrix, together with the GCP cloud architecture document, satisfies the required IAM design deliverable for the GCP module.
