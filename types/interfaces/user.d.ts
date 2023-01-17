/**
 * @description API response format for a GET call to `/users` by the client to fetch a list of users
 */
export interface IGetUsersResponse {
    "error_code": string;
    "http_code": string;
    "limit": number;
    "page": number;
    "page_count": number;
    "success": boolean;
    "users": IUserObject[];
    "users_count": number;
}
/**
 * @description Information that lives on a user object
 */
export interface IUserObject {
    /**
     * included in API response
     */
    account_closure_date: number;
    /**
     * included in API response
     */
    client: {
        id: string;
        name: string;
    };
    /**
     * optional, contains all the KYC information associated with the user profile.
     */
    documents: IUserDocument[];
    emails: string[];
    extra: {
        /**
         * optional, CIP Tag associated with the user object.
         */
        cip_tag: number;
        /**
         * optional, whether or not 2FA is enabled. defaults to `true`.
         * WE STRONGLY RECOMMEND USING 2FA OR SOME FORM OF MFA WITHIN YOUR APPLICATION.
         * {@link [read about OAuth](https://docs.synapsefi.com/api-references/oauth)}
         */
        extra_security: boolean;
        /**
         * included in API response, Unix timestamp (in ms) value of when the user object was created.
         */
        date_joined: number;
        /**
         * optional, if the user profile is a business, value is `true`. default is `false`
         */
        is_business: boolean;
        /**
         * optional, Unix timestamp (in ms) value of when the user object was last updated.
         */
        last_updated: number;
        /**
         * optional, 250 max character string
         */
        public_note: null | string;
        /**
         * optional, supplemental ID
         */
        supp_id: string | null;
    };
    flag: string;
    flag_code: unknown;
    ips: string[];
    is_hidden: boolean;
    /**
     * required for `POST` call
     */
    legal_names: string[];
    logins: {
        email: string;
        scope: string;
    }[];
    permission: string;
    permission_code: unknown;
    /**
     * required for `POST` call
     */
    phone_numbers: string[];
    photos: unknown[];
    /**
     * included in API response. Refresh token you will be using to OAuth the user.
     */
    refresh_token: string;
    /**
     * Included in API response. Represents if the user is on a meaningful screenings list. Go to Possible Watchlists Values to learn more.
     * {@link [Possible Watchlists Values](https://docs.synapsefi.com/api-references/users/user-object-details#possible-watchlists-values)}
     */
    watchlists: string;
    /**
     * included in API response, Primary key of user object
     */
    _id: string;
    _links: unknown;
    _v: number;
    [index: string]: any;
}
export interface IUserDocument {
    /**
     * required, Address city of the business location or individual's residence. If the user wishes to receive mail elsewhere, you can add that as a MAILING_ADDRESS social document. Go to Social Document Schema to learn more. We recommend verifying your address to prevent failure.
     *
     * {@link [Social Document Schema](https://docs.synapsefi.com/api-references/users/user-object-details#social-document-schema)}
     * {@link [verifying your address](https://beta-docs.synapsefi.com/api-references/miscellaneous/verify-address)}
     */
    address_city: string;
    /**
     * required, ISO Alpha-2 formatted Address country code of the business location or individual's residence.
     */
    address_country_code: string;
    /**
     * required, Address zip/postal code of the business location or individual's residence.
     */
    address_postal_code: string;
    /**
     * required, Address street of the business location or individual's residence.
     */
    address_street: string;
    /**
     * required, Address subdivision (state) of the business location or individual's residence.
     */
    address_subdivision: string;
    /**
     * optional, Common name for the individual/entity.
     */
    alias: string;
    /**
     * required if business base doc.
     * @enum "MSB","LENDING","NON-US_OFFICE","NON-US_ACTIVITY","CRYPTO","PUBLIC","PRIVATE","REGISTERED_WITH_SEC","OTHER","NBFI-US","NBFI-FOREIGN","LISTED-US","LISTED-FOREIGN","NFP","BANK-US","BANK-FOREIGN","FUND"
     */
    company_activity: string[];
    /**
     * required, Day of entity formation for business or Birth date for individual.
     */
    day: number;
    /**
     * optional, Desired scope for base document.
     */
    desired_scope: string;
    /**
     * optional
     */
    doc_option_key: string;
    /**
     * optional
     */
    docs_key: string;
    /**
     * optional
     */
    docs_title: string;
    /**
     * Included in API response. Included for business user's business base document. Possible values: VALID, INVALID, REVIEWING. Go to KYC, Risk and Compliance to learn more.
     * {@link [KYC, Risk and Compliance](https://docs.synapsefi.com/intro-to-risk)}
     */
    edd_status: string;
    /**
     * required, Email of the individual/entity associated with this base document.
     */
    email: string;
    /**
     * required, Industry or profession of business or individual. Go to Allowed Entity Scopes response section to see all the possible values.
     *
     * {@link [Allowed Entity Scopes](https://docs.synapsefi.com/api-references/users/allowed-entity-scopes)}
     */
    entity_scope: string;
    /**
     * required, Type of business or gender of the individual. Go to Allowed Entity Types response section to see all the possible values.
     *
     * {@link [ Allowed Entity Types](https://docs.synapsefi.com/api-references/users/allowed-entity-types)}
     */
    entity_type: string;
    /**
     * required if individual base doc on business user. Allowed values: `CONTROLLING_PERSON`, `UBO`.
     */
    entity_relationship: string;
    /**
     * required only to `PATCH` existing base document. Primary key of the base document. This value is a local primary key, meaning, it's only unique within a user object. Different user objects can have same base doc IDs.
     */
    id: string;
    /**
     * Included in API response, Included for an individual's base document (either for business, joint or individual accounts). Value ranges from 0-1. Go to ID Score to learn more.
     *
     * {@link [ID Score](https://docs.synapsefi.com/product-guides/id-score)}
     */
    id_score: number;
    /**
     * required, IP of the individual/entity associated with this base document.
     */
    ip: string;
    /**
     * required, Month of entity formation for business or Birth month for individual.
     */
    month: number;
    /**
     * required, Name of the individual/entity associated with this base document.
     */
    name: string;
    /**
     * required if individual base doc on business user. Percentage of the business owned by the beneficial owner.
     */
    ownership_percentage: number;
    /**
     * Included in API response. Permission scope of the base document.
     */
    permission_scope: string;
    /**
     * required, Phone number of the individual/entity associated with this base document.
     */
    phone_number: string;
    /**
     * Included in API response
     */
    required_edd_docs: string[];
    /**
     * optional, Physical documents linked to the base document. Go to Physical Document Schema to learn more.
     *
     * {@link [Physical Document Schema](https://docs.synapsefi.com/api-references/users/user-object-details#physical-document-schema)}
     */
    physical_docs: IUserPhysicalDoc[];
    /**
     * included in API response. This object contains all the sanctions screenings lists the user has been run against. This object is just a detailed response that decides the value of watchlists. Our recommendation is not to pay attention to this field but just the watchlists key instead. Go to Screenings Results Details to learn more.
     *
     * {@link [Screenings Results Details](https://docs.synapsefi.com/api-references/users/user-object-details#screenings-results-details)}
     */
    screening_results: {
        [index: string]: 'MATCH' | 'NO_MATCH' | 'FAILED' | 'PENDING' | 'FALSE_POSITIVE';
    };
    /**
     * optional. Social documents linked to the base document.
     *
     * {@link [Social Documents Schema](https://docs.synapsefi.com/api-references/users/user-object-details#social-document-schema)}
     */
    social_docs: IUserSocialDoc[];
    /**
     * included in API response. see ID Score to learn more
     *
     * {@link [ID Score](https://docs.synapsefi.com/product-guides/id-score)}
     */
    trust_level: 'low' | 'medium' | 'high';
    /**
     * optional. Virtual Documents linked to the base document.
     *
     * {@link [Virtual Document Schema](https://docs.synapsefi.com/api-references/users/user-object-details#virtual-document-schema)}
     */
    virtual_docs: IUserVirtualDoc[];
    /**
     * included in API repsonse. Represents if the user is on a meaningful screenings list. Go to Possible Watchlists Values to learn more.
     *
     * {@link [Possible Watchlists Values](https://docs.synapsefi.com/api-references/users/user-object-details#possible-watchlists-values)}
     */
    watchlists: 'PENDING' | 'SOFT_MATCH|PENDING_UPLOAD' | 'MATCH' | 'SOFT_MATCH' | 'NO_MATCH' | 'FALSE_POSITIVE';
    /**
     * required. Year of entity formation for business or Birth year for individual.
     */
    year: number;
    [index: string]: any;
}
export interface IUserPhysicalDoc {
    /**
     * required, Type of physical document being submitted. Go to Allowed Document Types response section to see all the possible values.
     *
     * {@link [Allowed Document Types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
     */
    document_type: string;
    /**
     * required. Value of the document. Physical documents must be encoded Base64 before being uploaded to our system. Please ensure that the image is clear, with all corners visible in case of a document with legible text. In case of videos, please ensure that the video is clear with ample light and audio is clear and without distortion or disturbance.
     *
     * In case of VIDEO_AUTHORIZATION, please ensure that the user's face is clearly visible and the audio is clear and states the user saying "I authorize account opening at <name_of_platform>."
     */
    document_value: string;
    /**
     * required if you wish to PATCH an existing virtual document. Primary key of the virtual document. This value is a local primary key, meaning, it's only unique within a base document. Different base documents can have same virtual document IDs.
     */
    id: string;
    /**
     * Included in API response. If the document status is SUBMITTED|INVALID, invalid_reasons describes the reasons for why the document was marked as invalid. Go to Possible Invalid Reasons Values to learn more.
     *
     * {@link [Possible Invalid Reasons Values](https://docs.synapsefi.com/api-references/users/user-object-details#possible-invalid-reasons-values-for-physical-docs)}
     */
    invalid_reasons: string[];
    /**
     * included in API repsonse. Unix timestamp (in ms) value of when the virtual document was last updated.
     */
    last_updated: number;
    /**
     * included in API response. Status of the virtual document. Go to Possible Sub-Document Status Values to learn more.
     *
     * {@link [Possible Sub-Document Status Values](https://docs.synapsefi.com/api-references/users/user-object-details#possible-sub-document-status-values)}
     */
    status: string;
    meta?: {
        /**
         * requirement depends. ISO Alpha-2 formatted state code of the issuing state of the physical document. Go to Allowed Document Types response section to see which physical documents require this field. This field will not be returned in any user responses.
         *
         * {@link [Allowed Document Types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
         */
        state_code?: string;
        /**
         * requirement depends, ISO Alpha-2 formatted country code of the issuing country of the physical document. Go to Allowed Document Types response section to see which physical documents require this field. This field will not be returned in any user responses.
         *
         * {@link [Allowed Document Types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
         */
        country_code?: string;
        /**
         * requirement depends. ID number associated with the physical document. Go to Allowed Document Types response section to see which physical documents require this field. This field will not be returned in any user responses.
         *
         * {@link [Allowed Document Types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
         */
        id_number?: string;
    };
    [index: string]: any;
}
export interface IUserVirtualDoc {
    /**
     * required, see response for Allowed Document Types to see possible values
     *
     * {@link [Allowed Document Types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
     */
    document_type: string;
    /**
     * required, value of the document
     */
    document_value: string;
    /**
     * required to `PATCH` existing document
     */
    id: string;
    /**
     * included in API response. Unix timestamp (in ms) value of when the document was last updated.
     */
    last_updated: number;
    /**
     * Included in API response. Status of the virtual document. Go to Possible Sub-Document Status Values to learn more.
     *
     * {@link [Possible Sub-Document Status Values](https://docs.synapsefi.com/api-references/users/user-object-details#possible-sub-document-status-values)}
     */
    status: string;
    meta?: {
        /**
         * requirement depends, ISO Alpha-2 formatted country code of the issuing country of the physical document. Go to Allowed Document Types response section to see which physical documents require this field. This field will not be returned in any user responses.
         *
         * {@link [Allowed Document Types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
         */
        country_code?: string;
    };
    [index: string]: any;
}
export interface IUserSocialDoc {
    /**
     * required, see response for Allowed Document Types to see possible values
     *
     * {@link [Allowed Document Types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
     */
    document_type: string;
    /**
     * required, value of the document
     */
    document_value: string;
    /**
     * required to `PATCH` existing document
     */
    id: string;
    /**
     * included in API response. Unix timestamp (in ms) value of when the document was last updated.
     */
    last_updated: number;
    /**
     * Included in API response. Status of the virtual document. Go to Possible Sub-Document Status Values to learn more.
     *
     * {@link [Possible Sub-Document Status Values](https://docs.synapsefi.com/api-references/users/user-object-details#possible-sub-document-status-values)}
     */
    status: string;
    info?: {
        /**
         * Included in API Response. Currently a response in MAILING_ADDRESS social document. Two reasons: invalid_address and address_has_incorrect_unit.
         */
        invalid_reasons: string[];
        /**
         * Included in API Response. ISO Alpha-2 formatted Address country code associated with the social document. Currently a response in MAILING_ADDRESS social document.
         */
        address_country_code: string;
        /**
         * Included in API Response. Address zip or postal code associated with the social document. Currently a response in MAILING_ADDRESS social document.
         */
        address_postal_code: string;
        /**
         * Included in API Response. Address city associated with the social document. Currently a response in MAILING_ADDRESS social document.
         */
        address_city: string;
        /**
         * Included in API Response. Address street associated with the social document. Currently a response in MAILING_ADDRESS social document.
         */
        address_street: string;
        /**
         * Included in API Response. Address subdivision (state)  associated with the social document. Currently a response in MAILING_ADDRESS social document.
         */
        address_subdivision: string;
        /**
         * Included in API Response. C/O name associated with the social document. Currently a response in MAILING_ADDRESS social document.
         */
        address_care_of: string;
    };
    meta?: {
        /**
         * requirement depends. Address zip or postal code associated with the social document. Currently a response in MAILING_ADDRESS social document. This field will not be returned in any user responses.
         */
        address_postal_code?: string;
        /**
         * requirement depends. Address city associated with the social document. Currently a response in MAILING_ADDRESS social document. This field will not be returned in any user responses.
         */
        address_city?: string;
        /**
         * requirement depends. Address street associated with the social document. Currently a response in MAILING_ADDRESS social document. This field will not be returned in any user responses.
         */
        address_street?: string;
        /**
         * requirement depends. Address subdivision (state)  associated with the social document. Currently a response in MAILING_ADDRESS social document. This field will not be returned in any user responses.
         */
        address_subdivision?: string;
        /**
         * Optional. C/O name associated with the social document. Currently a response in MAILING_ADDRESS social document. This field will not be returned in any user responses.
         */
        address_care_of?: string;
        /**
         * requirement depends, ISO Alpha-2 formatted country code of the issuing country of the physical document. Go to Allowed Document Types response section to see which physical documents require this field. This field will not be returned in any user responses.
         *
         * {@link [Allowed Document Types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
         */
        country_code?: string;
        /**
         * requirement depends. ISO Alpha-2 formatted Address country code of the issuing state of the virtual document. Go to Allowed Document Types response section to see which social documents require this field. This field will not be returned in any user responses.
         *
         * {@link [Allowed Document Types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
         */
        state_code?: string;
    };
    [index: string]: any;
}
