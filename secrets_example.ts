const appname = 'analytics'; // A nice name for your project, keep it simple, maybe no spaces and only - or _ for special characters?
const account = '012345678901'; // Your AWS account number, AWS displays it as xxxx-xxxx-xxxx in the web console, but just remove the dashes
const region = 'us-east-1'; // Region to deploy to.  Route53 zone and certificate need to be in us-east-1 regardless of what this is.  The region you pick must support all AWS services required by this app.
const zonecert = 'arn:aws:acm:us-east-1:012345678901:certificate/01234567-89ab-cdef-0123-456789abcdef'; // The cert ARN for a cert you create that covers your Route53 zone.  Since we're using cognito auth, make sure the cert covers your frontenddomain below, but also subdomains for your frontenddomain.  The wildcard in certificate domains covers subdomains but does not also cover sub-subdomains, so if your zone is 'asdf.net' and your frontenddomain is 'analytics.asdf.net' then your certificate needs at least 'analytics.asdf.net' and '*.analytics.asdf.net'
const fullname = 'Full Name'; // The full name Cognito will use to authenticate you
const email = 'you+analytics@example.com'; // The email address Cognito will use to authenticate you
const sites = [ 'example.com', 'blog.example.com' ]; // The sites you want to deploy analytics for
const frontenddomain = 'analytics.example.com'; // The domain, in your Route53 zone, that you want as your analytics frontend
const zoneid = 'Z00123456789ABCDEFGHI'; // The Route53 zone ID to deploy frontend to
const zonename = 'example.com'; // The Route53 zone name to deploy frontend to

export { appname, account, region, zonecert, fullname, email, sites, frontenddomain, zoneid, zonename };
