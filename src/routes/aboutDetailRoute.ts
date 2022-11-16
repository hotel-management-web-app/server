import express from 'express';
import {
  getAboutDetails,
  createAboutDetail,
  updateAboutDetail,
  getAboutDetail,
  deleteAboutDetail,
} from '../controllers/aboutDetailController';

const router = express.Router();

router.route('/').get(getAboutDetails).post(createAboutDetail);
router
  .route('/:id')
  .get(getAboutDetail)
  .put(updateAboutDetail)
  .delete(deleteAboutDetail);

export default router;
