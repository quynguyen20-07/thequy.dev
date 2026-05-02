# Production Checklist

## Pre-Deployment

- [ ] All tests pass: `yarn test`
- [ ] No console errors or warnings
- [ ] Environment variables documented in `.env.example`
- [ ] API endpoints verified and working
- [ ] Frontend builds without errors
- [ ] Backend compiles without TypeScript errors
- [ ] Database schema is up to date
- [ ] No sensitive data in code or git history

## Deployment

- [ ] Build successful: `yarn build`
- [ ] Static files generated: `frontend/dist/index.html` exists
- [ ] Server executable ready: `backend-express/dist/index.js` exists
- [ ] Environment variables configured on hosting platform
- [ ] Database connection string verified
- [ ] Uptime monitoring configured
- [ ] Error logging configured
- [ ] Backup system in place

## Post-Deployment

- [ ] Application is running: `curl https://your-domain.com/api/projects`
- [ ] Frontend loads: `curl https://your-domain.com`
- [ ] API endpoints responding
- [ ] Database queries working
- [ ] Authentication functional
- [ ] Logs are being collected
- [ ] SSL/HTTPS working
- [ ] Performance acceptable

## Monitoring

- [ ] Daily: Check application health
- [ ] Weekly: Review error logs
- [ ] Monthly: Review performance metrics
- [ ] Quarterly: Update dependencies

## Disaster Recovery

- [ ] Database backups automated
- [ ] Application backups in git
- [ ] Rollback plan documented
- [ ] Communication plan for incidents

## Security

- [ ] JWT_SECRET changed from default
- [ ] DATABASE_URL uses strong credentials
- [ ] CORS configured appropriately
- [ ] Input validation on all endpoints
- [ ] SQL injection prevented by Prisma
- [ ] HTTPS/SSL enabled
- [ ] Security headers configured
- [ ] Rate limiting considered

## Performance

- [ ] Frontend assets minified
- [ ] Backend code optimized
- [ ] Database queries indexed
- [ ] Caching strategy implemented
- [ ] CDN for static files considered
- [ ] Load testing completed
- [ ] Memory usage monitored
- [ ] CPU usage acceptable

## Documentation

- [ ] Deployment steps documented
- [ ] API documentation updated
- [ ] Environment variables documented
- [ ] Known issues documented
- [ ] Emergency contacts listed
- [ ] Runbook for common issues created
