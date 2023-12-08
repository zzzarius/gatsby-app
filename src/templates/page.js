import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Page = (props) => (
  <Layout>
    <main>
      <h1>Gatsby.js {props.pageContext.pageType} Page</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </main>
  </Layout>
)

export const query = graphql`
  query ($id: String!) {
    course(id: { eq: $id }) {
      id
      algoliaCourse {
        _geoloc {
          lat
          lng
        }
        _highlightResult {
          marketing_url {
            matchLevel
            value
          }
          partner {
            matchLevel
            value
          }
          partner_keys {
            matchLevel
            value
          }
          primary_description {
            matchLevel
            value
          }
          secondary_description {
            matchLevel
            value
          }
          tags {
            matchLevel
            value
          }
          tertiary_description {
            matchLevel
            value
          }
          title {
            matchLevel
            value
          }
        }
        active_run_key
        active_run_start
        active_run_type
        allowed_in
        availability
        availability_rank
        blocked_in
        card_image_url
        display_on_org_page
        language
        learning_type
        level
        marketing_url
        max_effort
        min_effort
        objectID
        organization_short_code_override
        owners {
          key
          logoImageUrl
          name
        }
        partner
        partner_keys
        primary_description
        product
        product_key
        product_marketing_video_url
        product_source
        program_type
        secondary_description
        recent_enrollment_count
        staff
        subject
        tags
        tertiary_description
        title
        uuid
        value_per_click_international
        value_per_click_usa
        value_per_lead_international
        value_per_lead_usa
        weeks_to_complete
      }
      discoveryCourse {
        additional_information
        advertised_course_run_uuid
        card_image_url
        course_run_keys
        course_run_statuses
        course_runs {
          availability
          content_language
          content_language_search_facet_name
          course
          course_uuid
          enrollment_count
          enterprise_subscription_inclusion
          estimated_hours
          expected_program_name
          expected_program_type
          full_description
          has_ofac_restrictions
          hidden
          image {
            src
          }
          is_enrollable
          is_marketable
          key
          level_type
          marketing_url
          max_effort
          min_effort
          ofac_comment
          outcome
          pacing_type
          recent_enrollment_count
          run_type
          seats {
            bulk_sku
            currency
            price
            sku
            upgrade_deadline_override
            type
            upgrade_deadline
          }
          end
          enrollment_end
          short_description
          staff {
            bio
            family_name
            given_name
            major_works
            position {
              organization_logo_image_url
              organization_id
              organization_marketing_url
              organization_name
              organization_override
              organization_uuid
              title
            }
            profile_image {
              medium {
                height
                url
                width
              }
            }
            profile_image_url
            published
            slug
            uuid
          }
          status
          start
          title
          transcript_languages
          type
          uuid
          video {
            image {
              src
            }
            src
          }
          weeks_to_complete
        }
        course_type
        data_modified_timestamp
        editable
        enrollment_count
        enterprise_subscription_inclusion
        entitlements {
          currency
          mode
          price
          sku
        }
        excluded_from_search
        excluded_from_seo
        faq
        full_description
        geolocation {
          lng
          lat
          location_name
        }
        image {
          src
        }
        in_year_value {
          per_click_international
          per_lead_international
          per_click_usa
          per_lead_usa
        }
        key
        key_for_reruns
        learner_testimonials
        level_type
        marketing_url
        organization_short_code_override
        outcome
        owners {
          auto_generate_course_run_keys
          certificate_logo_image_url
          banner_image_url
          data_modified_timestamp
          description
          description_es
          enterprise_subscription_inclusion
          key
          logo_image_url
          marketing_url
          name
          slug
          tags
          uuid
        }
        prerequisites_raw
        product_source {
          description
          name
          slug
        }
        programs {
          marketing_slug
          marketing_url
          number_of_courses
          title
          type
          type_attrs {
            coaching_supported
            slug
            uuid
          }
          uuid
        }
        recent_enrollment_count
        short_description
        skill_names
        skills {
          category {
            name
          }
          description
          name
          subcategory {
            category {
              name
            }
            name
          }
        }
        subjects {
          banner_image_url
          card_image_url
          description
          slug
          name
          subtitle
          uuid
        }
        syllabus_raw
        title
        topics
        type
        url_redirects
        url_slug
        url_slug_history
        uuid
        video {
          image {
            src
          }
          src
        }
      }
    }
  }
`

export default Page
