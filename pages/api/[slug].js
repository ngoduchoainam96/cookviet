import fire from '../../config/fire-conf';

export default async (req, res) => {
  if (req.method === 'POST') {
    const ref = fire.firestore().ref('notes').child(req.query.slug);
    const { snapshot } = await ref.transaction((currentViews) => {
      if (currentViews === null) {
        return 1;
      }

      return currentViews + 1;
    });

    return res.status(200).json({
      total: snapshot.val()
    });
  }
};
